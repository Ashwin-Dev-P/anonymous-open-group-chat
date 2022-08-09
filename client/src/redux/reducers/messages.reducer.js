import { UPDATE_MESSAGE, LOAD_MESSAGES } from "../actions/types";

const initialState = {
	messages: [],
	loading: true,
};

function messageReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_MESSAGE:
			return {
				...state,
				messages: [action.payload.data, ...state.messages],
			};

		case LOAD_MESSAGES:
			return {
				...state,
				messages: [...state.messages, ...action.payload.data],
				loading: false,
			};

		default:
			return state;
	}
}

export default messageReducer;
