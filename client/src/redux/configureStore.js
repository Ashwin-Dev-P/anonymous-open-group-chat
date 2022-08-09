import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

//reducer
import messageReducer from "./reducers/messages.reducer";
import typingReducer from "./reducers/typing.reducer";
import loginReducer from "./reducers/login.reducer";
import appDetailsReducer from "./reducers/appDetails.reducer";

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			message: messageReducer,
			typing: typingReducer,
			loginReducer: loginReducer,
			appDetailsReducer: appDetailsReducer,
		}),
		applyMiddleware(thunk, logger),
	);

	return store;
};
