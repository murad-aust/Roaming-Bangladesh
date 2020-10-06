import React, { useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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

    const location = {
      lat: lat,
      lng: lng
    };

    const onLoad = marker => {
      console.log('marker: ', marker)
    }
  return (
    <LoadScript
      googleMapsApiKey={apiKey.apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
         <Marker
      onLoad={onLoad}
      position={location}
    />
        
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)