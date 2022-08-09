import isLoggedIn from "../../utils/isLoggedIn";
import getUsername from "../../utils/getUsername";

import { UPDATE_LOGIN_STATUS } from "../actions/types";

const initialState = {
	login_status: {
		loggedIn: isLoggedIn(),
		username: getUsername(),
	},
};

function loginReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_LOGIN_STATUS:
			var loggedIn, username;
			if (isLoggedIn()) {
				loggedIn = true;
				username = getUsername();
			} else {
				loggedIn = false;
				username = null;
			}

			const login_status = {
				loggedIn: loggedIn,
				username: username,
			};
			return {
				...state,
				login_status: login_status,
			};

		default:
			return state;
	}
}

export default loginReducer;
