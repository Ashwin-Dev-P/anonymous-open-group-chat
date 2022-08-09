import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

//import route types
import RestrictedRoute from "./RestrictedRoute";

//components
import Login from "../components/login/index";
import Chatroom from "../components/chatroom/ChatRoom";

export default class MyRoutes extends Component {
	render() {
		return (
			<>
				<Routes location={this.props.location}>
					<Route exact path="/" element={<Chatroom />} />

					{/* Restricted routes  */}
					<Route exact path="/" element={<RestrictedRoute />}>
						<Route path="/login" element={<Login />} />
					</Route>
					{/* Restricted routes ends here */}

					{/* Default route */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</>
		);
	}
}
