import React from 'react';
import start_1 from '../../Icon/star.png'
import './HotelDetail.css'

const HotelDetail = (props) => {
    const { title, guest, bedroom, bed, bath, facilities, cancel, star, reviewed, price, image } = props.hotel;

    return (

        <div className="contain">
            <div>
                <img src={image} alt="" />
            </div>
            <div className="details">
                <h5>{title}</h5>
                <p> <span className="text-muted">{guest} guests {bedroom} bedrooms {bed} beds {bath} baths</span></p>
                <p><span className="text-muted">{facilities}</span></p>
                <p><span className="text-muted">{cancel}</span></p>
                <p className="reviewStar" ><img src={start_1} alt="" /> {star}({reviewed}) <span style={{ marginLeft: '50px' }}>${price}/<span className="text-muted">night</span></span> <span style={{ color: '#E1DFDD' }}>$169 total</span></p>

            </div>

        </div>

    );
};

export default HotelDetail;