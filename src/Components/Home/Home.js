import React, { useContext, useState } from 'react';
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
    width: '100%',
    height: '100%',
    position: 'fixed',
    

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