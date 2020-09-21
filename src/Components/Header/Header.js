import React, { useContext } from 'react';
import logo from '../../Logo.png';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
//import './Header.css'
import { Link } from 'react-router-dom';
import { AuthContext, UserContext } from '../../App';

const Header = (props) => {

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

  return (
    <Container>

      <Navbar expand="lg"  >

        <Navbar.Brand >
          <img
            src={logo}
            width="120"
            height="56"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"

          />
        </Navbar.Brand  >
        <Form inline >
          <FormControl style={{ width: '350px' }} type="text" placeholder="Search you destination" className="mr-sm-2" />
        </Form>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>

        <Nav className="mr-auto float-left " >

          <Link className="nav-link" style={{ color: `${props.color}` }} to="/home">News</Link>
          <Link className="nav-link" style={{ color: `${props.color}` }} to="/home">Destination</Link>
          <Link className="nav-link" style={{ color: `${props.color}` }} to="/home">Blog</Link>
          <Link className="nav-link" style={{ color: `${props.color}` }} to="/home">Contact</Link>


        </Nav>
        <span style={{ color: 'orange', marginRight: '5px' }}  >{loggedInUser.name}</span>
        {

          loggedInUser.success ?
            <Button variant="warning" onClick={() => setLoggedInUser({})}>Sign Out</Button>
            :
            <Link to="/login" ><Button variant="warning"> Login </Button> </Link>

        }



      </Navbar>


    </Container>

  );
};

export default Header;