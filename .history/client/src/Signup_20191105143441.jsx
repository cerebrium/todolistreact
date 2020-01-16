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
            password: this.state.password
        })
    }

    render () {
        return (

        )
    }
}

export default Signup;