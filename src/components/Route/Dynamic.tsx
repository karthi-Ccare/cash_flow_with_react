import React, { useState } from 'react'
import '../../styles.css'
import { Container, Form, Col, Row, Button } from "react-bootstrap";

const Dynamic = () => {

    const [formValues, setFormValues] = useState([{ name: "", email : ""}])

    let handleChange = (i:any, e:any) => {
        let newFormValues = [...formValues];
        // newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
      }
    
    let removeFormFields = (i:any) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event:any) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }

    return (
        <Container style={{ width: "40rem", marginTop: "50px" }}>
        <form  onSubmit={handleSubmit}>
          {formValues.map((element, index) => (   
            <div className="form-inline" key={index}>
              <label>Size</label>
              <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
              <label>Prize</label>
              <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
              {
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
            </div>
          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
              <button className="button submit" type="submit">Submit</button>
          </div>
      </form>
      </Container>
    )
}

export default Dynamic