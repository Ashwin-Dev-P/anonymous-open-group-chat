import getCookie from "./cookie/getCookie";
const getUsername = () => {
	const username = getCookie("username");
	return username || null;
};

export default getUsername;
