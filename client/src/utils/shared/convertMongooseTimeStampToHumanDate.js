const convertMongooseTimeStampToHumanDate = (input_date) => {
	var date = new Date(input_date);

	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();

	switch (m) {
		case 1:
			m = "Jan";
			break;
		case 2:
			m = "Feb";
			break;
		case 3:
			m = "Mar";
			break;
		case 4:
			m = "Apr";
			break;
		case 5:
			m = "May";
			break;
		case 6:
			m = "Jun";
			break;
		case 7:
			m = "Jul";
			break;
		case 8:
			m = "Aug";
			break;
		case 9:
			m = "Sep";
			break;
		case 10:
			m = "Oct";
			break;
		case 11:
			m = "Nov";
			break;
		case 12:
			m = "Dec";
			break;
		default:
			break;
	}

	return m + " " + d + "," + y;
};

export default convertMongooseTimeStampToHumanDate;
