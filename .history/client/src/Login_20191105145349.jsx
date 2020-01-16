import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        message: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        }).then( response => {
            if (response.data.type === 'error') {
                console.log('error: ', response.data.message)
            } else {
                localStorage.setItem('mernToken', response.data.token)
            }
        })
    }

    render () {
        return (

        )
    }
}
