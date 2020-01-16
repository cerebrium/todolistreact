import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = (props) => {

      // logout
    const logout = () => {
        localStorage.removeItem('mernToken')
        props.user.user = null
        props.user.token = ''
        console.log(props)
        window.location.reload()
    }

    return (
        <>
            <nav className='navbar'>
                <Link to='/logout' onClick={logout} className='links'>Logout</Link>{' | '}
                <Link to='/link1' className='links'>link1</Link>{' | '}
                <Link to='/link2' className='links'>link2</Link>{' | '}
                <Link to='/link2' className='links'>link3</Link>{' | '}
                <Link to='/link4' className='links'>link4</Link>
            </nav>
            <div className='welcomePage'>
                <h1>Welcome Home</h1>
            </div>
        </>
    )
}

export default WelcomePage