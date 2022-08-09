import React, { Component } from "react";

//redux
import { connect } from "react-redux";

//actions
import logoutAction from "../../redux/actions/login/logout.action";
import getAppDetailsAction from "../../redux/actions/other/getAppDetails.action";

//components
//shared
import MyButton from "../shared/MyButton";
import { Loading } from "../shared/Loading";

//react bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

class index extends Component {
	constructor(props) {
		super(props);

		this.logout = this.logout.bind(this);
	}

	async componentDidMount() {
		await this.props.getAppDetailsAction();
	}

	logout() {
		this.props.logoutAction();

		//page is refreshed so reconnection to socket using new user is possible
		window.location.href = "/";
	}
	render() {
		const { username } = this.props.login_status;

		const { status, details } = this.props.app_details;
		const { loading, error_message } = status;

		if (details) {
			var { application_name } = details;
		}
		return (
			<header>
				<Navbar>
					<Container>
						<Navbar.Brand href="/">
							{!loading ? (
								<>{!error_message ? <>{application_name}</> : null}</>
							) : (
								<Loading />
							)}
						</Navbar.Brand>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							{username ? (
								<>
									<Navbar.Text>
										<span className="p-3">
											Name: <span className="usernames">{username}</span>
										</span>
									</Navbar.Text>
									<MyButton
										onClick={this.logout}
										text="logout"
										variant="danger"
									/>
								</>
							) : null}
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</header>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	logoutAction: () => {
		dispatch(logoutAction());
	},

	getAppDetailsAction: () => {
		dispatch(getAppDetailsAction());
	},
});

const mapStateToProps = (state) => {
	return {
		login_status: state.loginReducer.login_status,
		app_details: state.appDetailsReducer,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
