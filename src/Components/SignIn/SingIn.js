import React, { useState } from 'react';
import Header from '../Header/Header';
import google from '../../Icon/google.png';
import fb from '../../Icon/fb.png';
import './SignIn.css'
import { useContext } from 'react';
import { AuthContext, UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, forgotPassword, handleGoogleSignIn, initializeLoginFramework, signInUserWithEmailAndPassword } from './SigninManeger';
const SingIn = () => {
  const [newUser, setNewUser] = useState(false);
  const [popup, setPopup] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [passwordVerified, setPasswordVerified] = useState(true);
  const [user, setUser] = useState({
    isSignedIn: false,
    firstName: '',
    lastName: '',
    email: '',
    resetEmail: '',
    password: '',
    error: '',
    success: false,
    confirmPassword: '',
    notMatch: false,
  })

  initializeLoginFramework();

  const [information, setInformation] = useContext(UserContext);

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
 

//Google Sign in

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }


//facebook Sign in

  const facebookSignIn = () => {
    handleFacebookSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

// Geting Respose from Firebase

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);

   if (redirect) {
      history.replace(from);
    }

  }

 // Handle input & verify email and password

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email' || e.target.name === 'resetEmail') {
       isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
       
      !isFormValid ?
        setEmailVerified(!emailVerified)
       :
       setEmailVerified(!emailVerified)
      
     

    }

    if (e.target.name === 'password') {
      const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/.test(e.target.value);
     
      isFormValid = isPasswordValid ;

     !isFormValid?
        setPasswordVerified(!passwordVerified)
      :
      setPasswordVerified(!passwordVerified)
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
  

    }

 

  }

// Handle Forget Password

  const handleForgetPassword = (email) => {

   alert("A Password Reset Email Sent to You Email Address.");
   
   forgotPassword(user.resetEmail);
  }

//Form Handle

  const handleSubmit = (e) => {

    if(user.password !== user.confirmPassword){
      const newUserInfo = {...user, notMatch: true }
      setUser(newUserInfo);

    }
    else if (newUser  && user.firstName && user.lastName && user.email && user.password) {

      const name = user.firstName + ' ' + user.lastName;
     

      createUserWithEmailAndPassword(name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })

    }


    if (!newUser && user.email && user.password) {

      signInUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          
          handleResponse(res, true);
      
        })
    }
    e.preventDefault();
  }
   

  return (

    <div className="container">

      <Header></Header>

      <div className="d-flex justify-content-center ">

             {/* Forget Password Popup window */}
             {
         
               popup && 

               <div className="popup">
                  <form className="form-container" >

                  <div className="form-group">
                      <input type="email" name="resetEmail" onBlur={handleBlur} placeholder="Enter Email" required/>
                 </div>
                 { 
                   !emailVerified && <p style={{color: 'red', width:'350px'}}>Enter a valid Email</p>
                  
            
                 }
              
                    <div>
                      <input type="submit" className="btn btn-warning"  value="Send" onClick={()=>(user.resetEmail && handleForgetPassword(user.resetEmail)) && setPopup(!popup)}/>
                    </div>
                      
                  </form>
               </div>

            }
          
        {/* Form input */}

        <div className="border  border-dark">
        <form onSubmit={handleSubmit}>
            {
              newUser ?
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Create a new account</div>
                :
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Sign in</div>

            }

            { newUser &&
              <div className="form-group">
                <input type="text" onBlur={handleBlur} name="firstName" placeholder="First name" required />
              </div>
            }

            { newUser &&
              <div className=" form-group">
                <input type="text" onBlur={handleBlur} name="lastName" placeholder="Last name" required />
              </div>
            }

            <div className="form-group">
              <input type="email" onBlur={handleBlur} name="email" placeholder="Enter email" required />
            </div>

            { 
              !emailVerified && 
              <p style={{color: 'red', width:'350px'}}>Enter a valid Email Address.</p>
            
            }

           

            <div className="form-group">
              <input type="password" onBlur={handleBlur} name="password" placeholder="Enter password" required/>
            </div>

            {
              !passwordVerified &&
               <p style={{color: 'red', width:'350px'}}>Password  must be 6 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.</p>
            }
           
            { newUser &&
            <div className="form-group">
            <input type="password" onBlur= {handleBlur}  name="confirmPassword" placeholder="Confirm password" required/>
            </div>
            
            }
            {
               newUser && user.notMatch && 
               <p style={{color: 'red'}}>Password did not match. Try again.</p>
            }

            {
              !newUser &&
               <div id="register-link" style={{ cursor: 'pointer' }} onClick= {() =>setPopup(!popup)}  className="text-right text-info">
                Forget Password
               </div>

            }


            {
              newUser ?
                <div>
                  <input type="submit" className="btn btn-warning" value="Sign Up" />
                </div>
                :
                <div>
                  <input type="submit" className="btn btn-warning" value="Sign in" />
                </div>
            }

            {
              newUser ?
                <div>
                  <p className="forgot-password text-center">
                    Already registered <span className="text-info" style={{ cursor: 'pointer' }} onClick={() => setNewUser(!newUser)} >sign in?</span>
                  </p>
                </div>
                :
                <div>
                  <p className="forgot-password text-center">
                    Don't have an account? <span className="text-info" style={{ cursor: 'pointer' }} onClick={() => setNewUser(!newUser)} >Create an account</span>
                  </p>
                </div>
            }

          </form>
        </div>
         
             
      </div>
      <div className="d-flex justify-content-center " style={{ margin: '10px' }}>
        <h6> <span>or</span>  </h6>
      </div>

      {/* Social media sign in */}
      <div className="d-flex justify-content-center ">
        <button onClick={googleSignIn} className="social" > <img src={google} alt="" /> <span style={{ marginLeft: '20px' }}>Continue  with Google</span> </button>
      </div>
      <br />
      <div className="d-flex justify-content-center ">
        <button onClick={facebookSignIn} className="social" > <img src={fb} alt="" /> <span style={{ marginLeft: '20px' }} >Continue  with Facebook</span> </button>
      </div>
    
    </div>
  );
};

export default SingIn;