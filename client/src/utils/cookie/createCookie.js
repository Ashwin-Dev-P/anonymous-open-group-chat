function createCookie(name, value, minutes, secure, SameSite, priority) {
	var expires;
	if (minutes != null) {
		var date = new Date();
		date.setTime(date.getTime() + minutes * 60 * 1000);
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}

	var my_cookie = name + "=" + value + expires + "; path=/;";

	if (SameSite) {
		my_cookie = my_cookie + ";SameSite=" + SameSite;
	}

	if (secure) {
		my_cookie = my_cookie + ";secure";
	}

	if (priority) {
		my_cookie = my_cookie + "; Priority=" + priority;
	}
	document.cookie = my_cookie;
}

export default createCookie;
