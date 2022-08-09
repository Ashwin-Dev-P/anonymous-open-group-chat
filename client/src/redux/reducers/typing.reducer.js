import { UPDATE_TYPING } from "../actions/types";

const initialState = {
	user_typing: null,
};

function typingReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_TYPING:
			return {
				...state,
				user_typing: action.payload.user_typing,
			};

		default:
			return state;
	}
}

export default typingReducer;
