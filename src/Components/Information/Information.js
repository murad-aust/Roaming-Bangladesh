import React, { useContext } from 'react';
import { Button,  Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Information = () => {
    const [information, setInformation] = useContext(UserContext)
    const {name,description}=information;
   
    return (
        <div>
            <Container style={{margin:'20px', textAlign:'center',marginTop:'90px',color:'white'}}>
              <h1 style={{textTransform:'uppercase'}}>{name}</h1>
              <p>{description}</p>
              <Link to="/booking">
                  <Button variant="warning">Booking-></Button>
              </Link>
           
            </Container>
        </div>
    );
};

export default Information;