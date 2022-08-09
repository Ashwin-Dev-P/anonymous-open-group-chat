import React, { Component } from "react";

//redux
import { connect } from "react-redux";

//actions
import receiveMessageAction from "../../redux/actions/messages/receiveMessage.action";
import typingAction from "../../redux/actions/messages/typing.action";
import stopTypingAction from "../../redux/actions/messages/stopTyping.action";
import getMessagesAction from "../../redux/actions/messages/getMessages.action";

//components
//shared
import { Loading } from "../shared/Loading";

//utils
import convertMongooseTimeStampToHumanDate from "../../utils/shared/convertMongooseTimeStampToHumanDate";
import convertTimeStampToDisplayTime from "../../utils/time/convertTimeStampToDisplayTime";

class ChatDisplayMessages extends Component {
	constructor(props) {
		super(props);

		this.socket = this.props.socket;
	}

	async componentDidMount() {
		//get old messages from database
		await this.props.getMessagesAction(1000);

		//SUBSCRIPTIONS

		//subscribed to message room
		await this.socket.on("message recieved", async (newMessageRecieved) => {
			//changes state when message is recieved
			await this.props.receiveMessageAction(newMessageRecieved);
		});

		await this.socket.on("typing message", async (user) => {
			//changes state if someone is typing
			await this.props.typingAction(user);
		});

		await this.socket.on("stopped typing message", async () => {
			//changes state when someone stops typing
			await this.props.stopTypingAction();
		});
	}

	generateMessages(messages) {
		var next_date = null;
		return messages.map((mymessage, index) => {
			const { createdAt, user, message } = mymessage;
			var { username } = mymessage;

			if (user) {
				username = user.username;
			}

			if (createdAt) {
				var date = convertMongooseTimeStampToHumanDate(createdAt);

				var time = convertTimeStampToDisplayTime(createdAt);

				if (time === "Invalid Date") {
					console.error(createdAt);
				}
			}

			if (index !== messages.length - 1) {
				//not last element
				next_date = convertMongooseTimeStampToHumanDate(
					messages[index + 1].createdAt,
				);
				var print_date;

				//get the timestamp of he next message to see if the message is from a different day. If different day then prin the date.
				if (next_date !== date) {
					print_date = true;
				} else {
					print_date = false;
				}
			} else {
				//print date if it is the last message(which is technically the oldest message recieved chronologically) since our list is inverted and displayed inverted again to get automatic scroll
				print_date = true;
			}

			return (
				<div key={message + index} className="py-2 ">
					{print_date ? (
						<div className="text-center print-date">
							<time dateTime={createdAt ? createdAt : ""}>{date}</time>
						</div>
					) : null}
					<span className="usernames">
						{username ? (
							username
						) : (
							<span className="anonymous-username text-muted">anonymous</span>
						)}
					</span>{" "}
					: <span className="message-content">{message}</span>
					<div>
						<span className="message-createdAt text-muted">
							<sub>
								<time dateTime={createdAt}>{time ? time : null}</time>
							</sub>
						</span>
					</div>
				</div>
			);
		});
	}

	render() {
		const { user_typing } = this.props.typing;
		const { messages, database_messages_loading } = this.props;
		const messages_div = this.generateMessages(messages);
		return (
			<div
				className="square border my-3 p-1 p-md-3 overflow-auto"
				id="message-content-window-div"
			>
				<div className="">
					{user_typing ? (
						<div className="typing-info text-muted">
							<span className="usernames">{user_typing}</span> is typing...
						</div>
					) : null}
				</div>

				{database_messages_loading ? (
					<div className="text-center m-5">
						<Loading />
					</div>
				) : null}

				{messages_div}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	getMessagesAction: (limit) => {
		dispatch(getMessagesAction(limit));
	},

	receiveMessageAction: (data) => {
		dispatch(receiveMessageAction(data));
	},

	typingAction: (user) => {
		dispatch(typingAction(user));
	},
	stopTypingAction: () => {
		dispatch(stopTypingAction());
	},
});

const mapStateToProps = (state) => {
	return {
		messages: state.message.messages,
		database_messages_loading: state.message.loading,
		typing: state.typing,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ChatDisplayMessages);
