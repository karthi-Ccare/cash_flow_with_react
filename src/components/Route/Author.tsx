import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Card } from "react-bootstrap";

const Author = () => {
	const { id }: { id: any } = useParams();
	const [user, setId] = useState([]);
	const [name, setName] = useState({ name: "", email: "", status: "" });

	useEffect(() => {
		Axios.get(`https://gorest.co.in/public/v1/users/${id}/posts/`)
			.then((res) => {
				console.log("Getting from ::::", res.data);
				setId(res.data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		Axios.get(`https://gorest.co.in/public/v1/users/${id}`)
			.then((response) => {
				console.log("Getting USer ::::", response.data);
				setName(response.data.data);
			})
			.catch((err) => console.log(err));
	}, []);

	console.log(name);

	const arr = user.map((data: any) => {
		return (
			<tr>
				<td>{data.title}</td>
				<td>{data.body}</td>
			</tr>
		);
	});

	return (
		// <div>
		//     <h1>This IS User ID : {id}</h1>
		// </div>
		<div className="App">
			<Card border="danger" style={{ width: "500px", marginLeft: "500px", marginTop: "20px" }}>
				<Card.Header>Author Details</Card.Header>
				<Card.Body>
					<Card.Title> Name: {name.name}</Card.Title>
					<Card.Title> Email: {name.email}</Card.Title>

					<Card.Text>
						<Card.Title> Status: {name.status}</Card.Title>
					</Card.Text>
				</Card.Body>
			</Card>

			<div style={{ padding: "30px", marginLeft: "50px", marginTop: "10px" }}>
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>Name</th>
							<th>Title</th>
						</tr>
						<tr>{/* <th>{name.status}</th> */}</tr>
					</thead>
					<tbody>
						{/* {user && user.length && user.map((name:any) => {
     return (
    <td>{name.name}</td>
      
     )
    } )} */}
						{arr}
					</tbody>
				</Table>
			</div>
		</div>
	);
};
export default Author;
