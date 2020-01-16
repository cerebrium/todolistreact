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
            [event.target.name] = event.target.value
        })
    }

    render () {
        return (

        )
    }
}

export default Signup;