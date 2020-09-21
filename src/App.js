import React, { createContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import places from './Data/places';
import Booking from './Components/Booking/Booking';
import NotFound from './Components/NotFound/NotFound';
import Hotel from './Components/Hotel/Hotel';
import SingIn from './Components/SignIn/SingIn';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
export const UserContext = createContext();
export const AuthContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [place,setPlace] = useState(places);
  const {id, name, description, image} = place[0];

  const [information, setInformation]= useState(
    {
      id: id,
      name: name,
      description :description ,
      image : image,
      origin:'', 
      from:'',
      to:'',
    
    }
  )
 
  return (
    <UserContext.Provider  value={[ information, setInformation]}>
      <AuthContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>

          <Route exact path="/">
              <Home></Home>
          </Route>

          <Route path="/booking">
            <Booking></Booking>
          </Route>

          <PrivateRoute  path="/hotel">
            <Hotel></Hotel>
          </PrivateRoute>

          <Route path="/login"> 
            <SingIn></SingIn>
          </Route>
            
          <Route  path="/home">
              <Home></Home>
          </Route>

          <Route path="*">
            <NotFound></NotFound>
          </Route>

        </Switch>
      </Router>

     
      </AuthContext.Provider>
      </UserContext.Provider >
  );
}

export default App;
