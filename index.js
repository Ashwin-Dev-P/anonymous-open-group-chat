//To enable .env file
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

const express = require("express");
const app = express();
const path = require("path");

//prevent NoSQL injection hacking
const mongoSanitize = require("express-mongo-sanitize");
app.use(
	mongoSanitize({
		onSanitize: ({ req, key }) => {
			console.warn(`This request[${key}] is sanitized`, req);
		},
	}),
);

//security
const helmet = require("helmet");
app.use(helmet());

var CORS_origin;
if (process.env.NODE_ENV === "development") {
	CORS_origin = ["http://localhost:3000"];
} else {
	CORS_origin = [];
}

//Enable CORS
if (process.env.NODE_ENV === "development") {
	const cors = require("cors");
	var corsOptions = {
		origin: CORS_origin,
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	};
	app.use(cors(corsOptions));
}

//DB connection
require("./src/models/index");

//middlewares
const getVisitorDetailsMiddleware = require("./src/middlewares/getVisitorDetails.middleware");
app.use(getVisitorDetailsMiddleware);

//import routes
const routes = require("./src/routes/");
app.use(routes);

//services
const { createUserService } = require("./src/services/User.service");
const { saveMessageService } = require("./src/services/Message.service");

//serve static assets if in production
if (process.env.NODE_ENV === "production" || true) {
	//Set static folder
	app.use(express.static("client/build"));

	app.get("*", async (req, res) => {
		await res.sendFile(
			path.resolve(__dirname, "client", "build", "index.html"),
		);
	});
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
	console.log(`Server started on  port ${PORT}`);
});

const cors_options_for_socket_io = {
	origin:
		process.env.NODE_ENV === "production"
			? [process.env.DOMAIN_NAME]
			: ["http://localhost:3000"],
};

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: cors_options_for_socket_io,
});

io.on("connection", (socket) => {
	socket.once("setup", async (username) => {
		//success callback
		const success = async (jwt) => {
			await socket.emit("connected", jwt);
		};

		//failure callback
		const error = async (error) => {
			console.error("Something went wrong\n", error);
			await socket.emit("unable to connect");
		};

		const ipAddress = socket.handshake.address;
		const userAgent = socket.request.headers["user-agent"];

		await createUserService(username, ipAddress, userAgent).then(
			success,
			error,
		);
	});

	//to join a particular chat
	socket.once("join chat", async (room_id) => {
		await socket.join(room_id);
	});

	//send typing message when someone is typing
	var recent_user = null;
	socket.on("typing", async (data) => {
		const { username, room_id } = data;
		recent_user = username;
		await socket.to(room_id).emit("typing message", username || "someone");
	});

	//sends stopped typing message when someone stopped typing
	var last_user = null;
	socket.on("stopped typing", async (data) => {
		const { username, room_id } = data;
		if (recent_user == username || recent_user == null) {
			//Stop typing is performed if the last person to be in the state of typing stops typing
			await socket
				.to(room_id)
				.emit("stopped typing message", username || "someone");
		}
		last_user = username;
	});

	socket.on("new message", async (new_data) => {
		const { jwt, message, username, createdAt } = new_data;

		const data = {
			message: message,
			username: username,
			createdAt: createdAt,
		};

		const room_id = 1;

		await socket.in(room_id).emit("message recieved", data);

		try {
			await saveMessageService(jwt, message);
		} catch (error) {
			console.error(error);
		}
	});

	socket.on("disconnect", async (reason) => {
		console.log("Disconnected", reason);
	});
});
