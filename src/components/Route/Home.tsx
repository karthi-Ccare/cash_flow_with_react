import React from "react";
import { Table} from "react-bootstrap";
 import {useEffect, useState} from 'react';
import styles from './mystyle.module.css'; 
import axios from "axios";
import post from "./Post";

function Home(){

    const [post, setPost] = useState({data:[1]})
    const [users, setUsers] = useState()


    fetch('https://gorest.co.in/public/v1/posts')
    .then((response) => response.json())
     
    .then((postdata) => {
      console.log(postdata)
        const respones = postdata.data.map((data:any) =>
            fetch(`https://gorest.co.in/public/v1/users/${data.user_id}`).then((res) => res.json()),
        );

        Promise.all(respones).then((fetcheddetails) => {
          console.log(fetcheddetails);
        });
    });

    
    
const api = post.data.map((data:any) => {
      return (
        <tr>
        <td>{data.user_id}</td>
        </tr>
    )
   })
  //   const apiuser = users.data.map((data:any) => {

  //   const getid = post.data.find((userd:any) => data.id === userd.user_id)
  //   console.log(getid);
  //   return (
  //      <tr>
  //       <td>{data.id}</td>
  //       <td>{data.name}</td>
  //       <td>{data.title}</td>
       
        
  //  </tr>
  //  )
  // })




  
    return (
        <div className="App">
         {/* <table>
     <tr>
       <th>#Id</th>
       <th>User_Id</th>
       <th>Body</th>
       <th>Title</th>

     </tr>
    {api}
       
    </table> */}
    
    <Table striped bordered hover variant="light"  style={{marginLeft:'100'}} >
  <thead>
    <tr>
        <th>#Id</th>
       <th>User_ Id</th>
       <th>Body</th>
       <th>Title</th>
       <th>Gmail</th>
    </tr>
  </thead>
  <tbody>
  {/* {apiuser} */}
     </tbody>
</Table>
      </div>
    );
}

export default Home;

