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
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // if no token remove all evidence of mernToken from local storage
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      axios.post('/auth/me/from/token', {token})
      .then( response => {
        if (response.data.type === 'error') {
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: response.data.message
          })
        } else {
          // if token is found, verify it on the back end
          // if verified store it in local storage and state

        }
      })
    }
  }


  render () {
    return (

    )
  }
}

export default App;
