//utils
import getUsername from "../../../utils/getUsername";

import { UPDATE_MESSAGE } from "../types";

const sendMessageAction = (message) => {
	const createdAt = Date.now();
	const data = {
		message: message,
		username: getUsername(),
		createdAt: createdAt,
	};

	return async (dispatch) => {
		await dispatch({
			type: UPDATE_MESSAGE,
			payload: {
				data: data,
			},
		});
	};
};

export default sendMessageAction;
