import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import axios from 'axios'

const WelcomePage = (props) => {
    const [dateSelected, setDateSelected] = useState(new Date())
    const [viewDate, setViewDate] = useState('')
    const [ time, setTime ] = useState('')
    const [ weatherData, setWeatherData ] = useState(null)
    const [ todoList, setTodoList ] = useState([])

    // Make The date into a string so can be passed to state
    useEffect(() => {
        let initialDate = dateSelected.toDateString()
        setViewDate(initialDate)
        axios.get('/api/weather').then( response => {
            console.log(response.data)
            setWeatherData(response.data)
        })
        let theTime = dateSelected.toTimeString()
            setTime(theTime)    
    }, [])

    // Keep time updating
    setInterval(() => {
        let currentDate = new Date()
        let currentTime = currentDate.toTimeString()
        setTime(currentTime)
    }, 1000)

    // logout
    const logout = () => {
        localStorage.removeItem('mernToken')
        props.user.user = null
        props.user.token = ''
        window.location.reload()
    }

    // Set the date on change function
    var onChangeTwo = (ev) => {
        let currDate = ev.toDateString()
        setViewDate(currDate)
        setDateSelected({ ev })
    }

    // Todo List
    

    // map the weather data into a nice flow
    var weatherApp;
    if (weatherData) {
        weatherApp = (
            <>
                <div>
                    <h3>{time}</h3>
                </div>
                <div className='weatherDailyData'>
                    <h3>Monday:<br /> {weatherData.data[0].summary}</h3>
                    <h3>Tuesday:<br /> {weatherData.data[1].summary}</h3>
                    <h3>Wednesdy:<br /> {weatherData.data[2].summary}</h3>
                    <h3>Thursday:<br /> {weatherData.data[3].summary}</h3>
                    <h3>Friday:<br /> {weatherData.data[4].summary}</h3>
                    <h3>Saturday:<br /> {weatherData.data[5].summary}</h3>
                    <h3>Sunday:<br /> {weatherData.data[6].summary}</h3>
                </div>
            </>
        )
    } else {
        weatherApp =('')
    }

    return (
        <>
            {/* <nav className='navbar'>
                <Link to='/logout' onClick={logout} className='links'>Logout</Link>
            </nav> */}
            <div className='welcomePage'>
                <div className='weatherStyle'>
                    {weatherApp}
                </div>
                <div className='bottomBoxes'>
                    <div className='calanderPlacer'>
                        <label>Selected Date: {viewDate}</label><br />  
                        <Calendar onChange={onChangeTwo} className='calendar'/><br />
                    </div>
                    <div className='calanderPlacer'>
                        <h3>Todo List</h3>
                    </div>

                </div>

            </div>
        </>
    )
}

export default WelcomePage


// {summary: "Light rain throughout the week.", icon: "rain", data: Array(8)}
// summary: "Light rain throughout the week."
// icon: "rain"
// data: Array(8)
// 0: {time: 1579161600, summary: "Possible drizzle in the morning.", icon: "rain", sunriseTime: 1579189980, sunsetTime: 1579222140, …}
// 1: {time: 1579248000, summary: "Light rain throughout the day.", icon: "rain", sunriseTime: 1579276320, sunsetTime: 1579308600, …}
// 2: {time: 1579334400, summary: "Light rain throughout the day.", icon: "rain", sunriseTime: 1579362660, sunsetTime: 1579395060, …}
// 3: {time: 1579420800, summary: "Possible drizzle in the morning.", icon: "rain", sunriseTime: 1579449000, sunsetTime: 1579481580, …}
// 4: {time: 1579507200, summary: "Overcast throughout the day.", icon: "rain", sunriseTime: 1579535340, sunsetTime: 1579568040, …}
// 5: {time: 1579593600, summary: "Light rain throughout the day.", icon: "rain", sunriseTime: 1579621740, sunsetTime: 1579654560, …}
// 6: {time: 1579680000, summary: "Possible drizzle in the morning.", icon: "rain", sunriseTime: 1579708080, sunsetTime: 1579741020, …}
// 7: {time: 1579766400, summary: "Overcast throughout the day.", icon: "rain", sunriseTime: 1579794420, sunsetTime: 1579827540, …}
// length: 8
// __proto__: Array(0)
// __proto__: Object