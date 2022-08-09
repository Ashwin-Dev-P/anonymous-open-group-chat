import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//utils
import isLoggedIn from "../utils/isLoggedIn";

const RestrictedRoute = () => {
	const auth = isLoggedIn();

	return auth ? <Navigate to="/" /> : <Outlet private_route={true} />;
};

export default RestrictedRoute;
