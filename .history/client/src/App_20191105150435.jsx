import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';

class App extends React.Component {
  state = { 
    token: '',
    user: null,
    errorMessage: '',

  }

  checkForLocalToken = () => {
    // Look in local storage for token
    // if no token remove all evidence of mern token from local storage
  }


  render () {
    return (

    )
  }
}

export default App;
