const convert24hrTimeTo12hr = (time) => {
	const timeString12hr = new Date(
		"1970-01-01T" + time + "Z",
	).toLocaleTimeString("en-US", {
		timeZone: "UTC",
		hour12: true,
		hour: "numeric",
		minute: "numeric",
	});

	return timeString12hr;
};

export default convert24hrTimeTo12hr;
