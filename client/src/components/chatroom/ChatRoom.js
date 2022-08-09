import React, { Component } from "react";

//services
import { socket } from "../../services/socket";

//redux
import { connect } from "react-redux";

//components
import ChatDisplayMessages from "./ChatDisplayMessages";
import ChatForm from "./ChatForm";

//react bootstrap
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class ChatRoom extends Component {
	constructor(props) {
		super(props);

		this.state = {
			room_id: 1,
		};

		this.socket = socket;

		//below emit makes sure that you can see messages even when you are not logged in.
		this.socket.emit("join chat", this.state.room_id);

		if (this.props.login_status.username) {
			this.socket.emit("setup", this.props.login_status.username);
		}
	}

	redirectToLogin() {
		window.location.href = "/login";
	}

	render() {
		const { loggedIn } = this.props.login_status;

		return (
			<>
				<Container>
					<Row className="justify-content-center">
						<Col
							xs={12}
							md={11}
							className="mt-md-1 p-md-4 square border no-x-padding"
						>
							<ChatDisplayMessages socket={this.socket} />

							{loggedIn ? (
								<ChatForm socket={this.socket} loggedIn={loggedIn} />
							) : (
								<a
									className="btn btn-success full-width text-center  white-color my-link"
									href="/login"
								>
									Start chatting
								</a>
							)}
						</Col>
					</Row>
				</Container>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => {
	return {
		login_status: state.loginReducer.login_status,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
