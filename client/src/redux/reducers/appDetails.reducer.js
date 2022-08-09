import {
	GET_APP_DETAILS_LOADING,
	GET_APP_DETAILS_SUCCESS,
	GET_APP_DETAILS_ERROR,
} from "../actions/types";

const initialState = {
	details: null,
	status: {
		loading: null,
		error_message: null,
	},
};

function appDetailsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_APP_DETAILS_LOADING:
			return {
				...state,
				status: {
					loading: true,
					error_message: null,
				},
			};

		case GET_APP_DETAILS_SUCCESS:
			return {
				...state,
				details: action.payload.details,
				status: {
					loading: false,
					error_message: null,
				},
			};

		case GET_APP_DETAILS_ERROR:
			return {
				...state,

				status: {
					loading: false,
					error_message: action.payload.error_message,
				},
			};

		default:
			return state;
	}
}

export default appDetailsReducer;
