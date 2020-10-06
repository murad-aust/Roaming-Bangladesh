import React, { useContext } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { UserContext } from '../../App';
import apiKey from './config';

const containerStyle = {
  width: '500px',
  height: '600px'
};



function Map() {
  const [information, setInformation] = useContext(UserContext);
    const {lat, lng}= information;
    console.log(lat, lng);

    const center = {
      lat: lat,
      lng: lng
    };
  return (
    <LoadScript
      googleMapsApiKey={apiKey.apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)