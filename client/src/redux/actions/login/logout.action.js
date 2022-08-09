//service
import { socket } from "../../../services/socket";

//utils
import { deleteCookie } from "../../../utils/cookie/deleteCookie";

import { UPDATE_LOGIN_STATUS } from "../types";

const logoutAction = () => {
	deleteCookie("jwt");
	deleteCookie("username");
	socket.disconnect();

	return async (dispatch) => {
		await dispatch({
			type: UPDATE_LOGIN_STATUS,
		});
	};
};

export default logoutAction;
