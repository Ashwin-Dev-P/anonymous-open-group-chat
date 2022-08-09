import React, { Component } from "react";

//react bootstrap
import Button from "react-bootstrap/Button";

export default class MyButton extends Component {
	render() {
		const { text, type, className, disabled, variant } = this.props;
		return (
			<>
				<Button
					className={className}
					type={type}
					onClick={this.props.onClick}
					disabled={disabled}
					variant={variant}
				>
					{text}
				</Button>
			</>
		);
	}
}
