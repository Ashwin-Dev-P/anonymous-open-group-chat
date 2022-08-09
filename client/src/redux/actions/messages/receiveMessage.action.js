import { UPDATE_MESSAGE } from "../types";

const receiveMessageAction = (data) => {
	return async (dispatch) => {
		await dispatch({
			type: UPDATE_MESSAGE,
			payload: {
				data: data,
			},
		});
	};
};

export default receiveMessageAction;
