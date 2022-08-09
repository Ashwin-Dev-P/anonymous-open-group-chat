//utils
import createCookie from "../../../utils/cookie/createCookie";

import { UPDATE_LOGIN_STATUS } from "../types";

const loginAction = (login_data) => {
	const { username, jwt } = login_data;

	createCookie("jwt", jwt, null, true, "Strict", "high");
	createCookie("username", username, null, true, "Strict", "high");

	return async (dispatch) => {
		await dispatch({
			type: UPDATE_LOGIN_STATUS,
		});
	};
};

export default loginAction;
