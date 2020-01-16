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
    lockedResult: 

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
        // if token is found, verify it on the back end
        if (response.data.type === 'error') {
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: response.data.message
          })
        } else {
          // if verified store it in local storage and state
          localStorage.setItem('mernToken', response.data.token)
          this.setState({
            token: response.data.token,
            user: response.data.user
          })
        }
      })
    }
  }

    componentDidMount = () => {
      this.checkForLocalToken()
    }

    liftToken = ({token, user}) => {
      this.setState({
        token,
        user
      })
  }

  logout = () => {
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: null
    })
  }
  
  handleClick = (event) => {
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/locked/test', config).then( response => {
      this.setState({

      })
    })
  }

  render () {
    let contents;
    if (this.state.user) {
      contents = (
        <>
          <p>Hello: {this.state.user.name}</p>
          <button onClick={this.handleClick}>Test the protected route</button>
          <button onClick={this.logout}>LOGOUT</button>
        </>
      )
    } else {
      contents = (
        <>
          <Signup liftToken={this.liftToken} />
          <Login liftToken={this.liftToken} />
        </>
      )
    }

    return (
      <div className='app'>
        <header>
          <h1>Welcome to my Site!</h1>
          <div className='content-box'>
            {contents}
          </div>
        </header>
      </div>
    )
  }
}

export default App;
