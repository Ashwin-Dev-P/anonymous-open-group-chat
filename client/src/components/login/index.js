import React, { Component } from "react";
import { Navigate } from "react-router-dom";

//services
import { socket } from "../../services/socket";

//redux
import { connect } from "react-redux";

//actions
import loginAction from "../../redux/actions/login/login.action";

//components
import Footer from "../footer/index";

//shared
import { Loading } from "../shared/Loading";

//react bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			room_id: 1,
			error_message: null,
			loading: false,

			jwt: null,
		};

		this.submitHandler = this.submitHandler.bind(this);

		this.socket = socket;
	}

	componentDidMount() {
		this.socket.on("connected", (jwt) => {
			console.log("connected");

			const username = document.getElementById("username").value;
			const login_data = {
				username: username,
				jwt: jwt,
			};
			this.props.loginAction(login_data);

			//the below code refreshes the page thereby prevent receiving multiple copies of same socket message(bug)
			window.location.href = "/";
		});

		this.socket.on("unable to connect", () => {
			console.error("unable to connect");
			this.setState({
				error_message: "Unable to connect",
				loading: false,
			});
		});
	}
	submitHandler(e) {
		e.preventDefault();

		this.setState({
			loading: true,
		});

		const username = document.getElementById("username").value;

		this.socket.emit("setup", username);
	}
	render() {
		const { loggedIn } = this.props.login_status;
		const { error_message, loading } = this.state;
		return (
			<>
				<Container id="login-component">
					<Row className="justify-content-center mt-5">
						<Col xs={12} md={6} lg={4} xl={3}>
							{loggedIn ? <Navigate to="/" /> : null}
							<Form
								onSubmit={this.submitHandler}
								className="square border p-3 mt-5"
							>
								<Form.Group className="mb-3" controlId="username">
									<Form.Label>Enter an username</Form.Label>
									<Form.Control
										type="text"
										inputMode="text"
										autoCapitalize="words"
										autoFocus
										required
									/>
								</Form.Group>

								{loading ? (
									<div className="text-center">
										<Loading />
									</div>
								) : (
									<>
										{error_message ? (
											<div className="error-div my-3 text-center">
												{error_message}
											</div>
										) : null}
									</>
								)}

								<div className="d-grid gap-2">
									<Button variant="success" type="submit">
										Start chatting
									</Button>
								</div>
							</Form>
						</Col>
					</Row>
				</Container>
				<Footer />
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	loginAction: (username) => {
		dispatch(loginAction(username));
	},
});

const mapStateToProps = (state) => {
	return {
		login_status: state.loginReducer.login_status,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
