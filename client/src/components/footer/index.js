import React, { Component } from "react";

//redux
import { connect } from "react-redux";

//components
import { Loading } from "../shared/Loading";

//react bootstrap
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

class index extends Component {
	render() {
		const { status, details } = this.props.app_details;
		const { loading, error_message } = status;

		if (details) {
			var { email, linkedin, contact_number } = details;
		}

		if (error_message) {
			console.error(error_message);
		}

		return (
			<>
				{loading ? (
					<div className="text-center">
						<Loading />
					</div>
				) : (
					<>
						{!error_message ? (
							<>
								{email || linkedin || contact_number ? (
									<footer className="p-5 mt-5">
										<Container>
											<Row>
												{email ? (
													<Col xs={12} md={6} lg={4} className="my-4">
														<a
															href={`mailto:${email}`}
															target="_blank"
															rel="noreferrer"
														>
															<div>
																<div>E-mail:</div>
																<div>{email}</div>
															</div>
														</a>
													</Col>
												) : null}

												{linkedin ? (
													<Col xs={12} md={6} lg={4} className="my-4">
														<div className="">
															<a
																href={`https://www.linkedin.com/in/${linkedin}/`}
																target="_blank"
																rel="noreferrer"
															>
																<div>
																	<div>LinkedIn:</div>
																	<div>{linkedin}</div>
																</div>
															</a>
														</div>
													</Col>
												) : null}

												{contact_number ? (
													<Col xs={12} md={6} lg={4} className="my-4">
														<a href={`tel:${contact_number}`}>
															<div>
																<div>Contact number:</div>
																<div>{contact_number}</div>
															</div>
														</a>
													</Col>
												) : null}
											</Row>
										</Container>
									</footer>
								) : null}
							</>
						) : null}
					</>
				)}
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => {
	return {
		app_details: state.appDetailsReducer,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
