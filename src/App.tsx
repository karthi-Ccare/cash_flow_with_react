import "./App.css";
import { Navbar, Container, Nav ,Button} from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Route/Home";
import Post from "./components/Route/Post";
import Create from "./components/Route/Create";
import Author from "./components/Route/Author";
import Todo from "./components/Route/Todo";
import Login from "./components/Route/Login";
import Dynamic from "./components/Route/Dynamic";

import { useHistory } from "react-router-dom";


const PrivateRoute = (props:any) => {
  const token= localStorage.getItem('accessToken');
  if(token){
  return <Route exact={true} path={props.path} component={props.component} />
  }else {
    return <Login {...props} />
  }
}


 


  function handleLogOut() {
    sessionStorage.setItem("userToken", '');
    sessionStorage.clear();
    // history.push("/login"); // whichever component you want it to route to
  }


function App(props:any) {
	return (
		<div className="App">
			<Router>
				<Navbar bg="danger" variant="dark">
					<Container>
						<Navbar.Brand>React</Navbar.Brand>
						<Nav className="me-auto">
							{/* <Nav.Link href="/home"> Home </Nav.Link> */}
							<Nav.Link href="/post"> Post </Nav.Link>
							<Nav.Link href="/todo">Todo</Nav.Link>
							<Nav.Link href="/create">Create Post</Nav.Link>
							<Nav.Link href="/dynamic">Button</Nav.Link>

              <Button 
							variant="danger"
              className="Button-add m-1 btn btn-danger"
              onClick={handleLogOut}
						 >
					 
							Logout
						</Button>
 						</Nav>
					</Container>    
				</Navbar>
        <Switch>
				{/* <Route path="/home" component={Home}></Route> */}
        <Route exact={true} path="/" component={Login} />
				<PrivateRoute path="/post" component={Post}/> 
				<PrivateRoute path="/create" component={Create}/> 
				<PrivateRoute path="/todo" component={Todo}/>
				<Route path="/author/:id" component={Author}>
  						<Author />
					</Route>
					<Route path="/dynamic" component={Dynamic}/>
				</Switch>
				
			</Router>
		 
		</div>

	);
}

export default App;
