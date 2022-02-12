import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Pagination, Button, InputGroup, FormControl,Modal } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import User from "./User";

function Post(props: any) {
	const [post, setPost] = useState<any[]>([]);
	const [delid, setDelete] = useState([]);
	const [search, setSearch] = useState<any>("");
	const [opsearch, setOutearch] = useState<any[]>([]);
	const [show, setShow] = useState(false);
	const [yesDelete,setYesDelete] = useState({id:0,index:0});
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	
	console.log(search);
	const [pagination, setPagination] = useState({
		limit: 20,
		links: {
			current: "https://gorest.co.in/public/v1/posts?page=1",
			next: "https://gorest.co.in/public/v1/posts?page=2",
			previous: null,
		},
		page: 1,
		pages: 55,
		total: 1089,
	});

	console.log(pagination);
	const Prev = (url: any) => {
		Axios.get(`${url}`)
			.then((res) => {
				console.log("Getting from ::::", res.data);
				setPagination(res.data.meta.pagination);
        setPost(res.data.data);
        setOutearch(res.data.data);
			})
			.catch((err) => console.log(err));
	};
	console.log(post);
	useEffect(() => {
		Prev(pagination.links.current);
	}, []);
	console.log(post);

	useEffect(() => {
    if(search.length >0)
    {
      const newdata = post.filter((val: any) => {
        return Object.values(val).join("").toLowerCase().includes(search.toLowerCase());
      });
      setOutearch(newdata)
    }
    else{
      setOutearch(post)
    }
	}, [search]);
	//   useEffect(() => {
	//   Axios.get('https://gorest.co.in/public/v1/posts')
	//  .then(res => {
	//   console.log("Getting from ::::",res.data)
	//   setPost(res.data.data)
	//   setPagination(res.data.meta)

	//  }).catch(err => console.log(err))
	//   }, [])

	const Delete = (data: any) => {
		let newpost: any[] = [...data];
		setPost(newpost);
		console.log(newpost);
	};

	const accessToken = "fd66f3209595370cdc08dc1affa02ed4827672012390a74fdd4cfe5728c14c33";


	const postDelete = (id: any, index: any) => {
		console.log(id);
		const data = {
			// "user_id":478,
			//  user_id,
			// "user_id":43,
			// "title": "Et cotidie adulatio cervus pauper tamen volaticus causa.",
			// "body": "Blandior cervus minus. Admoveo ante sumptus. Tamdiu adeo attollo. Vestigium cinis avaritia. Volo qui sto. Decerno desolo administratio. Terga adfero derelinquo. Vester veritas tergeo. Arma sed temeritas. Officiis turpis tactus. Voro quia assumenda. Creptio vulticulus ut. Culpa antea velit. Vero deprimo tersus. Thesis impedit odio.",
		};
		Axios.delete(`https://gorest.co.in/public/v1/posts/${id}`, {
			headers: {
				authorization: `Bearer ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				alert("Deleted");
				post.splice(index, 1);
				return Delete(post);
			})
			.catch((error) => {
				//return  error;
			});
	};


	const arr = opsearch.map((data: any, index) => {
		return (
			<tr>
				<td>
					<Link to={`/Author/${data.user_id}`}>
						{" "}
						<User userId={data.user_id} />
					</Link>
				</td>
				<td>{data.title}</td>
				<td>{data.body}</td>
				<td>
					{"  "}
					<Button onClick={(e: any) =>{handleShow();setYesDelete({id:data.id,index: index});}}>Delete</Button>{" "}
				</td>
			</tr>
		);
	});
	//  useEffect(() => {
	//    Axios.get(  )
	//  })

	
	return (
		<div className="App">
			<InputGroup style={{ width: "350px", marginLeft: "500px", marginTop: "40px" }}>
				<FormControl
					aria-label="Dollar amount (with dot and two decimal places)"
					placeholder="Search Post"
					onChange={(e: any) => setSearch(e.target.value)}
				/>
			</InputGroup>
			<Table
				striped
				bordered
				hover
				variant="light"
				style={{ width: "1000px", marginLeft: "200px", marginTop: "80px" }}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Title</th>
						<th>Body</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{/* {apiuser} */}
					{arr}
 				</tbody>
			</Table>

			<Button
				variant="primary"
				onClick={(e) => {
					Prev(pagination.links.previous);
				}}>
				Previous
			</Button>
			{"  "}
			<Button variant="primary">{pagination.page}</Button>
			{"  "}
			<Button
				variant="primary"
				onClick={(e) => {
					Prev(pagination.links.next);
				}}>
				Next
			</Button>
			{"   "}
			<Modal show={show} onHide={handleClose}>
			  <Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			  </Modal.Header>
			  <Modal.Body>You sure you wanna delete?</Modal.Body>
			  <Modal.Footer>
				<Button variant="danger" onClick={()=>{postDelete(yesDelete.id,yesDelete.index);handleClose()}}>
				  Delete
				</Button>
			  </Modal.Footer>
			</Modal>
		</div>
	);
}

export default Post;
