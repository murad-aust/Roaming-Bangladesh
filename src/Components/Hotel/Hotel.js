import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import hotels from '../../Data/hotels';
import Header from '../Header/Header';
import HotelDetail from '../HotelDetail/HotelDetail';
import  Map from '../Map/Map';

const Hotel = () => {
    const [information, setInformation] = useContext(UserContext);
    const {name, from, to}= information;
    const specifiedHotel = hotels.filter(ht => ht.placeId === information.id);
    console.log(information);
    
    return (
        <div className="container" >
            <Header color="black"></Header>
            <div style={{margin:'20px'}}>
              <p>251 stays {from} - {to} 4 guests</p>
              <h4 >Stay in {name}</h4>
            </div>
           <div style={{display: 'flex'}}>

               <div>
                 {
                     specifiedHotel.map(hotel =><HotelDetail key={hotel.id} hotel={hotel} ></HotelDetail>)

                 }
     
              </div>
             <div >
               <Map></Map>
             </div>

           </div>
           
        </div>
    );
};

export default Hotel;