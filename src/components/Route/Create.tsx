import React from "react";
import { Container, Form, Col, Row, Button} from "react-bootstrap";
import { BrowserRouter as Router, Route , Link} from "react-router-dom";

import { useEffect, useState} from 'react';
import Axios from "axios";

const Create = () =>{

   const [data, setUser] = useState<any>([])
  const [user, setId] = useState<any>()
  const [title, setTitle] = useState<any>([])
  const [body, setBody] = useState<any>([])

  useEffect(() => {
    Axios.get('https://gorest.co.in/public/v1/users')
    .then(res => {
     console.log("Getting from ::::",res.data)
     setUser(res.data.data)
    }).catch(error => console.log(error))
     
     }, [])
     console.log(user)


 
   
      
const user_id = user;
  
   const accessToken = 'fd66f3209595370cdc08dc1affa02ed4827672012390a74fdd4cfe5728c14c33';
        
  const postData =(e:any) => {
    e.preventDefault();
    const data = {
      // "user_id":478,
      user_id,
      title,
      body
      // "user_id":43,
      // "title": "Et cotidie adulatio cervus pauper tamen volaticus causa.",
      // "body": "Blandior cervus minus. Admoveo ante sumptus. Tamdiu adeo attollo. Vestigium cinis avaritia. Volo qui sto. Decerno desolo administratio. Terga adfero derelinquo. Vester veritas tergeo. Arma sed temeritas. Officiis turpis tactus. Voro quia assumenda. Creptio vulticulus ut. Culpa antea velit. Vero deprimo tersus. Thesis impedit odio.",
      
    }
    Axios.post('https://gorest.co.in/public/v1/posts',data, {
      headers: {
          'authorization': `Bearer ${accessToken}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
    console.log("success")
      // return  response;
  })
  .catch((error) => {
      //return  error;
  });
  }
    return <div>
        <Container style={{ width: "40rem",marginTop: "50px" }} >
        <Form>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    <Form.Label column sm="2">
      User Name
    </Form.Label>
    <Col sm="10">
     <Form.Select  onChange={(e:any)=> setId(e.target.value)}>
     <option>Select The User Name</option>
     {data && data.length && data.map((user:any) => {
     return (
      <option value={user.id}>{user.name}</option>

     )
     {console.log(data.user.id) }

    } )}

</Form.Select>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
     Title
    </Form.Label>
    <Col sm="10">
      <Form.Control onChange={(e:any)=> setTitle(e.target.value)}   type="text" placeholder="" required />

    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
    Body
    </Form.Label>
    <Col sm="10">
      <Form.Control    onChange={(e:any)=> setBody(e.target.value)}  type="text" placeholder=""   />
    </Col>
  </Form.Group>

  <Button  variant="danger" className="Button-add m-1" type="submit" onClick={(e:any)=>postData(e)}>
 
    <Link  style={{ textDecoration:"none"}}  to={`/Author/${user}`} >  Submit
  
      
  </Link> 
  
  </Button>  
</Form>
</Container>
          </div>
}

export default Create;