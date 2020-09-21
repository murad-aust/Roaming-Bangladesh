import React, { useContext } from 'react';
import Header from '../Header/Header';
import { UserContext } from '../../App';
import './Booking.css'
import { useHistory } from 'react-router-dom';

const Booking = () => {
    const [information, setInformation] = useContext(UserContext)
    const history = useHistory();
    
    const {name, description, image}=information;
    
  const style={
      backgroundImage: `url("${image}")` ,
      backgroundPosition: 'center',
      backgroundSize:'cover',
      backgroundRepeat: 'no-repeat',
      minHeight: '100%',
	  minWidth: '1024px',
      width: '100%',
      height: 'auto',
      position: 'fixed',
      top: 0,
      left: 0 
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        history.push("/hotel")
    }

    const handleBlur= (e) =>{
        information[e.target.name] = e.target.value;
    

    }

    
    return (
        <div style={style}>
          <Header color="white"></Header>
          <div className="container">
				<div className="row">
					<div className="col-md-7 col-md-push-5">
						<div className="booking-place">
							<h1>{name}</h1>
							<p>{description}</p>
						</div>
					</div>
					<div className="col-md-4 col-md-pull-7">
						<div className="booking-form">
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label className="form-label">Origin</label>
									<input name="origin" onBlur={handleBlur} className="form-control" type="text" />
								</div>
								<div className="form-group">
									<label className="form-label">Destination</label>
									<input defaultValue={name} className="form-control" type="text" />
								</div>

								<div className="row">
									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label">From</label>
											<input name="from" onBlur={handleBlur} className="form-control" type="date" required/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<label className="form-label">To</label>
											<input name="to" onBlur={handleBlur} className="form-control" type="date" required/>
										</div>
									</div>
								</div>

								<div>
									<input type="submit"  value="Start Booking" className="submit-btn" /> 
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

        </div>
    );
};

export default Booking;