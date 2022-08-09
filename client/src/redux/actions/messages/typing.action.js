import { UPDATE_TYPING } from "../types";

const typingAction = (user) => {
	return async (dispatch) => {
		await dispatch({
			type: UPDATE_TYPING,
			payload: {
				user_typing: user,
			},
		});
	};
};

export default typingAction;
