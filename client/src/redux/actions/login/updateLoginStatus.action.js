import { UPDATE_LOGIN_STATUS } from "../types";

const updateLoginStatusAction = () => {
	return async (dispatch) => {
		await dispatch({
			type: UPDATE_LOGIN_STATUS,
		});
	};
};

export default updateLoginStatusAction;
