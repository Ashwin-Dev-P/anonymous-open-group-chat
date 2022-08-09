import convert24hrTimeTo12hr from "./convert24hrTimeTo12hr";
function convertTimeStampToDisplayTime(createdAt) {
	var xdate = new Date(createdAt);

	function formatTime(x) {
		if (x < 10) {
			x = "0" + x;
		}

		return x;
	}

	//24 hr time is generated in hh:mm:ss format and converted to 12hr format
	//createdAt is from mongodb or from Date.now() sent from other person sent through socket

	const hr = formatTime(xdate.getHours());
	const min = formatTime(xdate.getMinutes());
	const sec = formatTime(xdate.getSeconds());
	var time = hr + ":" + min + ":" + sec;

	time = convert24hrTimeTo12hr(time);
	return time;
}

export default convertTimeStampToDisplayTime;
