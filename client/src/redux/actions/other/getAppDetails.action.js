import axios from "axios";
import {
	GET_APP_DETAILS_ERROR,
	GET_APP_DETAILS_LOADING,
	GET_APP_DETAILS_SUCCESS,
} from "../types";

const backend_url = process.env.REACT_APP_BACKEND_URL;

const getAppDetailsAction = () => {
	return async (dispatch) => {
		await dispatch({
			type: GET_APP_DETAILS_LOADING,
		});

		var url = backend_url + `/api/application_details`;
		await axios
			.get(url)
			.then(async (response) => {
				if (response.status === 200) {
					if (response.data.status === 200) {
						const details = response.data.details;
						await dispatch({
							type: GET_APP_DETAILS_SUCCESS,
							payload: {
								details: details,
							},
						});
					} else {
						var error = new Error();
						error.status = response.data.status;
						error.message = response.data.message;
						throw error;
					}
				}
			})
			.catch(async (error) => {
				var error_message;
				try {
					error_message = error.response.data.message;
				} catch (e) {
					error_message = error.message;
				}

				error_message = error_message || "Something went wrong";
				console.error(error_message);

				await dispatch({
					type: GET_APP_DETAILS_ERROR,
					payload: {
						error_message: error_message,
					},
				});
			});
	};
};

export default getAppDetailsAction;
