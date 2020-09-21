import React, { useState } from 'react';
import Header from '../Header/Header';
import google from '../../Icon/google.png';
import fb from '../../Icon/fb.png';
import './SignIn.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, forgotPassword, handleGoogleSignIn, initializeLoginFramework, signInUserWithEmailAndPassword } from './SigninManeger';
const SingIn = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser]= useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
      })
    
      initializeLoginFramework();

      const [information, setInformation]= useContext(UserContext);
      
      const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
    
      const history = useHistory();
      const location = useLocation();
      let { from } = location.state || { from: { pathname: "/" } };
    
      
      const googleSignIn = ()=>{
        handleGoogleSignIn()
        .then(res =>{
          handleResponse(res,true);
        })
      }
    
      const facebookSignIn = ()=>{
        handleFacebookSignIn()
        .then(res =>{
          handleResponse(res,true);
        })
      }
       
     const handleResponse = (res,redirect)=>{
      setUser(res);
      setLoggedInUser(res);
      if(redirect){
        history.replace(from);
      }
    
     }
    
     const handleBlur = (e) => {
       let isFormValid = true;
       if(e.target.name === 'email'){
        isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    
       }
       if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6; 
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
      }
      if(isFormValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    
    
    
      }
    
    
    }
    
     const handleSubmit = (e) => {
       if(newUser && user.firstName  && user.lastName && user.email && user.password){
          
        const name= user.firstName + ' ' + user.lastName;
      
       
           createUserWithEmailAndPassword(name, user.email, user.password)
           .then(res => {
            handleResponse(res,true);
           })
    
       }
     
    
       if(!newUser  && user.email && user.password ){
        
          signInUserWithEmailAndPassword(user.email, user.password)
          .then(res => {
            handleResponse(res,true);
           })
       }
       e.preventDefault();
     }
    return (
    <div className="container">
        <Header></Header>
       <div className="d-flex justify-content-center ">
         <div className="border  border-dark">
        <form onSubmit={handleSubmit}>
            {
                newUser ? 
                <div style={{fontSize:'20px',fontWeight:'bold'}}>Create a new account</div>
                :
                <div style={{fontSize:'20px',fontWeight:'bold'}}>Sign in</div>

            }

          { newUser &&
           <div className="form-group">
                
                <input type="text" onBlur={handleBlur} name="firstName" placeholder="First name" />
            </div>
            }

           {   newUser &&
                <div className=" form-group">
                
                    <input type="text" onBlur={handleBlur} name="lastName"  placeholder="Last name" />
                </div>
            }

            <div className="form-group">
               
                <input type="email" onBlur={handleBlur} name="email" placeholder="Enter email" />
            </div>

            <div className="form-group">
              
                <input type="password"  onBlur={handleBlur} name="password"  placeholder="Enter password" />
            </div>
            <div id="register-link" class="text-right">
                             <Link class="text-info"> Forget Password</Link>   
              </div>

        {
        newUser?
        <div>
            <input type="submit" className="btn btn-warning"  value="Sign Up"/>
           
        </div>
        :
        <div>
            <input type="submit" className="btn btn-warning"   value="Sign in"/>
            
        </div>
        }

{
        newUser?
        <div>
          
            <p className="forgot-password text-center">
                Already registered <Link to="/login" onClick={()=>setNewUser(!newUser)} >sign in?</Link>
            </p>
        </div>
        :
        <div>
          
            <p className="forgot-password text-center">
                Don't have an account? <Link to="/login" onClick={()=>setNewUser(!newUser)} >Create an account</Link>
            </p>
        </div>
        }
        </form>
    </div>
    </div>
    <div  className="d-flex justify-content-center " style={{margin:'10px'}}>
        <h6> <span>or</span>  </h6>
    </div>
    <div  className="d-flex justify-content-center ">
        <button onClick={googleSignIn} className="social" > <img src={google} alt=""/> <span style={{marginLeft:'20px'}}>Continue  with Google</span> </button>
    </div>
    <br/>
    <div  className="d-flex justify-content-center ">
       <button onClick={facebookSignIn } className="social" > <img src={fb} alt=""/> <span style={{marginLeft:'20px'}} >Continue  with Facebook</span> </button>
    </div>
    
    
</div>
    );
};

export default SingIn;