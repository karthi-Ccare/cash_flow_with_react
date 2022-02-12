import React, { useEffect, useState, useRef } from "react";
import  ReactDom from 'react-dom'
 
function ref() {

    const [val, setVal] = useState('');
    return (
<div>
         <input
        type= "text"
        placeholder ="useRef "
        onChange ={(e) => setVal(e.target.value)}
        />
        <p>{val}</p> 
        </div>
    )
}
export default ref;