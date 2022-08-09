import { UPDATE_TYPING } from "../types";

const stopTypingAction = () => {
	return async (dispatch) => {
		await dispatch({
			type: UPDATE_TYPING,
			payload: {
				user_typing: null,
			},
		});
	};
};

export default stopTypingAction;
