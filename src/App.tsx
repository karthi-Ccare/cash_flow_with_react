import './App.css';
import { Navbar, Container, Nav} from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Route/Home";
import Post from "./components/Route/Post";
import Create from "./components/Route/Create";
import Author from "./components/Route/Author";
import Todo from "./components/Route/Todo";



function App() {
  return (
    <div className="App">
      <Router>
   <Navbar bg="danger" variant="dark" >
    <Container>
    <Navbar.Brand >React</Navbar.Brand>
    <Nav className="me-auto">
    {/* <Nav.Link href="/home"> Home </Nav.Link> */}
    <Nav.Link href="/post"> Post </Nav.Link>
       <Nav.Link  href="/todo">Todo</Nav.Link>
      <Nav.Link href="/create">Create Post</Nav.Link>
    </Nav>

    
			 
    </Container>
  </Navbar>
  {/* <Route path="/home" component={Home}></Route> */}
  <Route exact path="/post" component={Post}></Route>
  <Route path="/create" component={Create}></Route>
  <Route path="/todo" component={Todo}></Route>
  <Switch>

  <Route path="/author/:id" component={Author}>

    <Author />
  </Route>

  </Switch>

  </Router>
		 

			 
		
    </div>
  );
}

export default App;
