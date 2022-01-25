import React from "react";
import {useEffect, useState} from 'react';
import Axios from "axios";
import { Table} from "react-bootstrap";
const Todouser = (props:any) => {


    const [user, setUser] = useState({name:''})
    useEffect(() => {
   Axios.get(`https://gorest.co.in/public/v1/todos/${props.userId}`)
   .then(res => {
    console.log("Getting from ::::",res.data)
    setUser(res.data.data)
    console.log(res.data)
    
   }).catch(err => console.log(err))
    
    }, [props.userId])

       return (
        <span>{user.name}</span>
    );
}
  
  export default Todouser;