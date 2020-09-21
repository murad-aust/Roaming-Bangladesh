import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }


}


export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true
      }

      return signedInUser;


    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })

}

export const handleFacebookSignIn = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(facebookProvider)
    .then(res => {
      const { displayName, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true
      }

      return signedInUser;


    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })

}




export const handleSignedOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false

      }
      return signedOutUser;

    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })

}

export const createUserWithEmailAndPassword = (name, email, password) => {

  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      updateUserName(name);
      newUserInfo.success = true;
      return newUserInfo;



    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // ...
    });
}

export const signInUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const { displayName, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true
      }

      return signedInUser;



    })

    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;


    });
}

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  })
    .then(function () {
      console.log('name updated successfully')

    })
    .catch(function (error) {
      console.log(error)
    });
}



export const forgotPassword = email => {

  const auth = firebase.auth();
  
  
  auth.sendPasswordResetEmail(email).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });


}
