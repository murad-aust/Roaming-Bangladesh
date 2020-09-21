import React, { useContext } from 'react';
import { Card, Container} from 'react-bootstrap';
import { UserContext } from '../../App';
import './Place.css';

const Place = (props) => {

    const{name, description, image} = props.place;
    const [information, setInformation] = useContext(UserContext);

    const handlePlaces=()=>{
        setInformation(props.place);
    }
 
    return (
        
        <div onClick={handlePlaces} style={{float: 'left'}}>
                <Container  >
                    <Card className="card" >
                        <Card.Img variant="top" src={image} height="300px"/>
                        <h3 >{name}</h3>
                    </Card>
              
                </Container>
               
        </div>
    );
};

export default Place;