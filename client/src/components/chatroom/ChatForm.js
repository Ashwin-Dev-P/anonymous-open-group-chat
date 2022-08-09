import React, { Component } from "react";

//redux
import { connect } from "react-redux";

//actions
import sendMessageAction from "../../redux/actions/messages/sendMessage.action";

//components
//shared components
import MyButton from "../shared/MyButton";

//react bootstrap
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//utils
import getUsername from "../../utils/getUsername";
import getCookie from "../../utils/cookie/getCookie";

const REACT_APP_TYPING_WAIT_TIME = process.env.REACT_APP_TYPING_WAIT_TIME;

class ChatForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			room_id: 1,
		};

		this.socket = this.props.socket;
		this.sendMessage = this.sendMessage.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.typing = this.typing.bind(this);
		this.stopTyping = this.stopTyping.bind(this);
	}

	async sendMessage(message) {
		const send_data = {
			jwt: getCookie("jwt"),
			message: message,
			username: getUsername(),
			createdAt: Date.now(),
		};

		await this.socket.emit("new message", send_data);
		await this.props.sendMessageAction(message);
	}

	async submitHandler(event) {
		this.stopTyping();

		await event.preventDefault();
		const message_input = await document.getElementById("message");
		const message = message_input.value;
		message_input.value = "";
		await this.sendMessage(message);
	}

	async typing() {
		const data = {
			username: getUsername(),
			room_id: this.state.room_id,
		};
		await this.socket.emit("typing", data);

		let timer; // Timer identifier

		const waitTime = REACT_APP_TYPING_WAIT_TIME; // Wait time in milliseconds

		// Listen for `keyup` event
		const input = document.getElementById("message");
		await input.addEventListener("keyup", async (e) => {
			// Clear timer
			await clearTimeout(timer);

			// Wait for X ms and then emit stop typing
			timer = await setTimeout(async () => {
				//no keyboard reactions so stop typing
				this.stopTyping();
			}, waitTime);
		});
	}

	async stopTyping() {
		const data = {
			username: getUsername(),
			room_id: this.state.room_id,
		};
		await this.setState({
			typing: false,
		});

		await this.socket.emit("stopped typing", data);
	}

	onEnterPress = (e) => {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			this.submitHandler(e);
		}
	};

	render() {
		return (
			<Form onSubmit={this.submitHandler} id="message_form">
				<Row className="p-xs-1 p-md-3">
					<Col xs={9} className="px-0">
						<Form.Group className="px-1" controlId="message">
							<Form.Control
								as="textarea"
								autoCapitalize="sentences"
								autoComplete="off"
								autoFocus
								onChange={this.typing}
								onBlur={this.stopTyping}
								required
								rows={1}
								onKeyDown={this.onEnterPress}
							/>
						</Form.Group>
					</Col>

					<Col xs={3} className="px-0">
						<div>
							<MyButton
								text="send"
								variant="success"
								type="submit"
								className=" full-width"
							/>
						</div>
					</Col>
				</Row>
			</Form>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	sendMessageAction: (data) => {
		dispatch(sendMessageAction(data));
	},
});

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
