import React from "react";
import { Container, Form, Col, Row, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props:any) => {
	let history = useHistory<any>();

	const [name, setUsername] = useState("");
	const [password, setPassword] = useState("");

	console.log(name);
	console.log(password);
	const attemptLogin = () => {
		let data = {
			username: `${name}`,
			password: `${password}`,
		};
		const res:any = axios
			.post(`http://localhost:4001/login/`, data)
			.then((res:any) => {
				console.log(res.data.accessToken)
				localStorage.setItem('accessToken', res.data.accessToken);
				history.push(`/Post`);

				alert("loged");
				console.log("hii");
			})
			.catch((e: any) => {
				alert("Incorrect Username & password");
				console.log(e);
			});
	};
    
	return (
		<div>
			<div className="shadow-box-example hoverable">
				<Card border="danger" style={{ width: "35rem", marginTop: "50px", marginLeft: "400px" }}>
					<Form style={{ marginTop: "50px" }}>
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
							<Form.Label column sm="4">
								User Name
							</Form.Label>
							<Col sm="8">
								<Form.Control
									style={{ width: "15rem" }}
									type="text"
									placeholder=""
									required
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Col>
						</Form.Group>
						<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
							<Form.Label column sm="4">
								Password
							</Form.Label>
							<Col sm="8">
								<Form.Control
									style={{ width: "15rem" }}
									type="text"
									placeholder=""
									required
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Col>
						</Form.Group>
						<Button
							variant="danger"
							className="Button-add m-1 btn btn-danger"
							onClick={() => {
								attemptLogin();
							}}>
							{""}
							Login
						</Button>
					</Form>
				</Card>
				<Container></Container>
			</div>
		</div>
	);
};

export default Login;
