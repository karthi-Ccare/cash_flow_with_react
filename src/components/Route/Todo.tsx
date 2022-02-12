import React from "react";
import {useEffect, useState} from 'react';
import Axios from "axios";
import { Table, Button} from "react-bootstrap";
import Todouser from "./Todo_id";
import { Prev } from "react-bootstrap/esm/PageItem";



const Todo = (props:any) => {
    const [todo, setTodo] = useState([])
    const [pagination, setPagination] = useState({

       "limit": 20,
       links: {current: "https://gorest.co.in/public/v1/todos?page=1",
       next: "https://gorest.co.in/public/v1/todos?page=2",
       previous: null},
       "page": 1,
       "pages": 55,
       "total": 1089})

    console.log(pagination)
      const Prev = (url:any)=>{
      Axios.get(`${url}`)
      .then(res => {
       console.log("Getting from ::::",res.data)
       setPagination(res.data.meta.pagination)
       console.log(setPagination)
       setTodo(res.data.data)
      }).catch(err => console.log(err))
    }
      useEffect(() => {
      Prev(pagination.links.current)
    }, [])
    
             const arr = todo.map((data:any,index) => {
            return (
              <tr key={index}>
                    {/* <td> <Todouser userId={data.id}/> </td> */}
                    {/* <td> {data.user_id} </td> */}
               <td>{data.title}</td>
               <td>{data.status}</td>
              </tr>
            )
           })
           return (
            <div className="App">
        <Table striped bordered hover variant="light"  style={{width:"1000px",marginLeft:"200px", marginTop:"20px"}}  >
      <thead>
        <tr>
             <th>Title</th>
            <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {/* {apiuser} */}
      {arr}
         </tbody>
    </Table>
     <Button variant="primary" onClick={(e)=>{Prev(pagination.links.previous)}}>Previous</Button>{'  '}
     <Button variant="primary">{pagination.page}</Button>{'  '}
     <Button variant="primary" onClick={(e)=>{Prev(pagination.links.next)}}>Next</Button>{'   '}
          </div>
        );
}
  
  export default Todo;