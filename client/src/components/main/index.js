import React, { Component } from "react";

import MyRoutes from "../../routes/MyRoutes";

//components
import Header from "../header/index";

export default class index extends Component {
	render() {
		return (
			<>
				<Header />

				<main>
					<MyRoutes />
				</main>
			</>
		);
	}
}
