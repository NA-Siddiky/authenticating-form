import React, { useState } from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState({});
  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var FbProvider = new firebase.auth.FacebookAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleFacebookSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(FbProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        console.log('fb user', user);
        setUser(user)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log('Git User', user);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in using google</button>
      <br />
      <button onClick={handleFacebookSignIn}>Sign in using Facebook</button>
      <br />
      <button onClick={handleGithubSignIn}>Sign in using Github</button>
      <br />
      <h2>FB name: {user.displayName}</h2>

      <h3>Email: {user.email}</h3>

      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
