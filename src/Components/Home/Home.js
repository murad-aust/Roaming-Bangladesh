import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import places from '../../Data/places';
import Header from '../Header/Header';
import Information from '../Information/Information';
import Place from '../Place/Place';


const Home = () => {
  const [place, setPlace] = useState(places);
  const [information, setInformation] = useContext(UserContext)

  const { image } = information;

  const style = {
    backgroundImage: `url("${image}")`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100%',
    minWidth: '1024px',
    width: '100%',
    height: 'auto',
    position: 'fixed',
    top: 0,
    left: 0

  }
  return (
    <div style={style} >
      <Header color="white"></Header>
      <div className="d-flex">

        <div style={{ marginTop: '20px', width: '40%' }}>
          <Information></Information>
        </div>
        <div style={{ marginTop: '20px', width: '60%' }}>
          {
            place.map(place => <Place key={place.id} place={place}></Place>)

          }
        </div>
      </div>
    </div>
  );
};

export default Home;