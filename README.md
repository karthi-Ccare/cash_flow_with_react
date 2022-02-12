# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


const fetchData = () => {
      const postApi = 'https://gorest.co.in/public/v1/posts';
        const userApi = 'https://gorest.co.in/public/v1/users';
        

        const getUserApi = axios.get(userApi);
        const getPostApi = axios.get(postApi);
        axios.all([getUserApi, getPostApi]).then(
            axios.spread((...allData) => {
                const allDataPlayer =allData[0].data;
                const getPostApi = allData[1].data;
                setUsers(allDataPlayer);
                setPost(getPostApi);
                // console.log(getPostApi);
            })
        )
    }

useEffect(() => {
    fetchData()
},[])



//     useEffect(() =>{
//         Axios.get('https://gorest.co.in/public/v1/users')
//         .then((response:any) => {
//             console.log("Getting Users::::",response.users)
//             setUsers(response.users.data)
//         }).catch(err => console.log(err))
//     }, [])

//     useEffect(() =>{
//         Axios.get('https://gorest.co.in/public/v1/posts')
//         .then((res:any) => {
//             console.log("Getting from ::::",res.data)
//             setApi(res.data.data)
//         }).catch(err => console.log(err))
 
//     }, [])
// data && data.data && data.data.length && 




import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form, Alert, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Head from '../../Headers/header';


const Createpost = () => {
  const token = "2d2c2842af9c1bc1d85fd23e25f2808dd28ac02e2c29dce368d55841a10ddb34";

axios.interceptors.request.use(
  (req: any) => {
    req.headers.authorization = `Bearer ${token}`;

    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);
  let history = useHistory<any>();
  const [title, settitle] = useState<any>([]);
  const [body, setbody] = useState<any>([]);
  const [user_id, setuser_id] = useState<any>([]);
  const [postid, setpostid] = useState<any>([]);

  useEffect(() => {
    axios.get(`https://gorest.co.in/public/v1/users`).then((response: any) => {
      setpostid(response.data);
      setuser_id(response.data.data[0].id)
    });
  },[]);
 
  const postData = async (e:any) => {
    e.preventDefault()
    axios
      .post(`https://gorest.co.in/public/v1/posts`, {
        user_id,
        title,
        body,
      })
      .then(() => {
        alert("Success");
        history.push(`/user/${user_id}`);
      }).catch(() => {
      alert("This Faild");
  });
  }
 
  return (
    <div className="App">
      <Head></Head>
      <h1 style={{textAlign:'center'}}>Create Post</h1>
      <Alert variant="success">
        <Alert.Heading></Alert.Heading>
        <Card body>
        <div style={{textAlign:'center'}}>
        <div className="form-group row ">
          <label className="col-sm-1 col-form-label">USER NAME</label>
          <div className="col-sm-3">
            <div className="md-form mt-0">
          <Form.Select
          className="form-control"
            aria-label="Default select example"
            onChange={(e) => setuser_id(e.target.value)}
          >
            {postid && postid.data &&
              postid.data.length &&
              postid.data.map((data: any,index:any  ) => {
                return <option key={index} value={data.id}>{data.name}</option>;
              })}
          </Form.Select>
          </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 col-form-label">TITLE</label>
          <div className="col-sm-3">
            <div className="md-form mt-0">
              <input
                type="text"
                className="form-control"
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-1 col-form-label">BODY</label>
          <div className="col-sm-3">
            <div className="md-form mt-0">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setbody(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-5">
            <Button type="submit" variant="primary" onClick={postData}>
              ADD
            </Button>
          </div>
        </div>
      </div>
      </Card>
      </Alert>
   
     
    </div>
  );
};
export default Createpost;




import React from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { useEffect, useState } from "react";
import Axios from "axios";

const Create = () => {
	const [data, setUser] = useState<any>([]);
	const [user, setId] = useState<any>();
	const [title, setTitle] = useState<any>([]);
	const [body, setBody] = useState<any>([]);
    const history = useHistory();
	useEffect(() => {
		Axios.get("https://gorest.co.in/public/v1/users")
			.then((res) => {
				console.log("Getting from ::::", res.data);
				setUser(res.data.data);
			})
			.catch((error) => console.log(error));
	}, []);
	console.log(user);

	const user_id = user;

	const accessToken = " ";

	const postData = (e: any) => {
		e.preventDefault();
		const data = {
			// "user_id":478,
			title,
			body,
			// "user_id":43,
			// "title": "Et cotidie adulatio cervus pauper tamen volaticus causa.",
			// "body": "Blandior cervus minus. Admoveo ante sumptus. Tamdiu adeo attollo. Vestigium cinis avaritia. Volo qui sto. Decerno desolo administratio. Terga adfero derelinquo. Vester veritas tergeo. Arma sed temeritas. Officiis turpis tactus. Voro quia assumenda. Creptio vulticulus ut. Culpa antea velit. Vero deprimo tersus. Thesis impedit odio.",
		};
		Axios.post(`https://gorest.co.in//public/v1/users/${user_id}/posts`, data, {
			headers: {
				authorization: `Bearer ${accessToken}`,
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
        console.log(response.data.data.user_id);
        return  history.push(`/Author/${response.data.data.user_id}`);
				// return  response;
			})
			.catch((error) => {
				//return  error;
			});
	};
	return (
 		<div>

			<Container style={{ width: "40rem", marginTop: "50px" }}>
				<Form>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
						<Form.Label column sm="2">
							User Name
						</Form.Label>
						<Col sm="10">
							<Form.Select onChange={(e: any) => setId(e.target.value)}>
								<option>Select The User Name</option>
								{data &&
									data.length &&
									data.map((user: any) => {
										return <option value={user.id}>{user.name}</option>;
									})}
							</Form.Select>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
						<Form.Label column sm="2">
							Title
						</Form.Label>
						<Col sm="10">
							<Form.Control
								onChange={(e: any) => setTitle(e.target.value)}
								type="text"
								placeholder=""
								required
							/>
						</Col>
					</Form.Group>
					<Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
						<Form.Label column sm="2">
							Body
						</Form.Label>
						<Col sm="10">
							<Form.Control onChange={(e: any) => setBody(e.target.value)} type="text" placeholder="" />
						</Col>
					</Form.Group>
					<Button variant="danger" className="Button-add m-1" type="submit" onClick={(e:any) => postData(e)}>
						<Link style={{ textDecoration: "none" }} to={`/Author/${user}`}>
							{""}
							Submit
						</Link>
					</Button>
				</Form>
			</Container>
		</div>
     
	);
};

export default Create;



Login//


 
import Authpost from '../Post/Home/Authpost';
import Userlist from '../Post/Form/Userlist'
import Createpost from '../Post/Form/Createpost';
import Todo from '../Post/Todo/Todo';
import {BrowserRouter,Route,Switch } from 'react-router-dom';
import Login from '../Post/Form/Login';


import PageNot from '../Headers/PageNot';const PrivateRoute = (props:any) => {
const token= localStorage.getItem('AccessToken');
if(token){
return <Route exact={true} path={props.path} component={props.component} />
}else {
return <Login {...props} />
}
}function Goroutes(props:any) { return (
<BrowserRouter>
<Switch>
<Route exact={true} path="/" component={Login} />
<PrivateRoute path="/Home" component={Authpost} />
<PrivateRoute path="/todo" component={Todo}/>
<PrivateRoute path="/create" component={Createpost}/>
<PrivateRoute path="/user/:id" component={Userlist}/>
<Route component={PageNot}/>
</Switch>
</BrowserRouter>
)
}
export default Goroutes;

# cash_flow_with_react
