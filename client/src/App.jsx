import React, { useState, useEffect} from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import WelcomePage from './welcomePage';

const App = () => {
    const [ token, setToken ] = useState('')
    const [ user, setUser ] = useState(null)
    const [ errorMessage, setErrorMessage] = useState('')
    const [ lockedResult, setLockedResult ] = useState('')

  // handles writting data to database and recieving google data
  const responseGoogle = (response) => {
      axios.post('/auth/googlesignup', {
        name: response.profileObj.name, 
        email: response.profileObj.email
      }).then(res => {
        setUser(res.data)
      })
  }

  const checkForLocalToken = () => {
    // Look in local storage for token
    let myToken = localStorage.getItem('mernToken');
    if (myToken) {
      setToken(myToken)
    }
    if (!token || token === 'undefined') {
      // if no token remove all evidence of mernToken from local storage
      localStorage.removeItem('mernToken')
        setToken('')
        setUser(null)
    } else {
      axios.post('/auth/me/from/token', {token})
      .then( response => {
        // if token is found, verify it on the back end
        if (response.data.type === 'error') {
          localStorage.removeItem('mernToken')
            setToken('')
            setUser(null)
            setErrorMessage(response.data.message)
        } else {
          // if verified store it in local storage and state
          localStorage.setItem('mernToken', response.data.token)
            setToken(response.data.token)
            setUser(response.data.user)
        }
      })
    }
  }

  // check to see if person is logged in or not
  useEffect(() => {
    checkForLocalToken()
  }, [])

  // method for setting the token in local storage to go through the routes
  const liftToken = ({token, user}) => {
      setToken(token)
      setUser(user)
  }

  // logout
  const logout = () => {
    localStorage.removeItem('mernToken')
      setToken('')
      setUser(null)
  }

  var navbar;
  if (user) {
    navbar = (
      <>
          <Route exact path = '/' render={ () => <WelcomePage user={user} token={token}/> } />
      </>
    )
  } else {
    navbar = ('')
  }
  let contents;
  if (user) {
    contents = (
        <>
          {navbar}
        </>
    )
  } else {
    contents = (
      <div className='app'>
        <div className='content-box'>
          <h1>NAuth</h1>
          <GoogleLogin
              clientId="801108272625-cbbc8i5j8v8s423p95mkte842cdp7d32.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className='googleLogin'
            />
          <Signup liftToken={liftToken} />
          <Login liftToken={liftToken} className='login'/>
        </div>
      </div>
    )
  }

  return (
    <Router>
          {contents}
    </Router>
  )
}

export default App;
