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
    
  }


  render () {
    return (

    )
  }
}

export default App;
