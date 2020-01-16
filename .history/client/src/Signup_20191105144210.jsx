import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        message: ''
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        // NEIN NEIN NEIN NEIN NEIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        event.preventDefault()
        axios.post('/auth/signup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }).then( response => {
            if (response.data.type === 'error') {
                console.log('error: ', response.data.message)
                // TODO maybe put this message in state
            } else {
                // sets the token as an object key:mernToken value:response.data.token
                localStorage.setItem('mernToken', response.data.token)
                this.props.liftToken(response.data)
            }
        }).catch( err => {
            // this block catches rate limiter errors
            console.log(err);
        })
    }

    render () {
        return (
            
        )
    }
}

export default Signup;