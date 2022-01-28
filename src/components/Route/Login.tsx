import React from "react";
import { useEffect, useState } from "react";
import { Container, Form, Col, Row, Button,Card } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";



const Login = ( ) => {
	let history = useHistory<any>();

	const [name, setName] = useState<any[]>([]);
	const [password, setPassword] = useState<any[]>([]);
	const [login, setLogin] = useState<any>("");


 console.log(name);
 console.log(password);
 
 const handleSubmit = async (e:any) => {
	e.preventDefault();
	try {
	const res:any = await axios.post("localhost:1001/api/login", { name, password }).then((res:any) => {

	localStorage.setItem('AccessToken', res.data.accessToken);
	history.push(`/Post`)
	});
	} catch (err) {
	alert("Incorrect Username and Password");
	}
	};


       return (	
        <div >
            <div className="shadow-box-example hoverable">          
            <Card  border="danger"style={{ width: "35rem", marginTop: "50px" ,marginLeft:"400px"}}>
            <Form style={{marginTop:"50px" }} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
						<Form.Label column sm="4">
							User Name
						</Form.Label>
						<Col sm="8">
							<Form.Control style={{ width: "15rem"}}
								type="text"
								placeholder=""
								required
								onChange={(e:any) => setName(e.target.value)}
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
						<Form.Label column sm="4">
							Password
						</Form.Label>
						<Col sm="8">
							<Form.Control style={{ width: "15rem"}}

								type="text"
								placeholder=""
								required
								onChange={(e:any) => setPassword(e.target.value)}
							/>
						</Col>
					</Form.Group>
				 
					<Button variant="danger" className="Button-add m-1" type="submit">
							{""}
						Login
					 
					</Button>
				</Form>
</Card>
            <Container >
				
			</Container>
        </div>
        </div>
    );
}
  
  export default Login;