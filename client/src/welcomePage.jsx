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
    var handleSubmit = (ev) => {
        ev.preventDefault()
        var currentList = []
        if (todoList.length > 0) {
            currentList = [...todoList]
            currentList.push(ev.target.item.value)
            setTodoList(currentList)
        } else {
            currentList.push(ev.target.item.value)
            setTodoList(currentList)
        }
    }

    // todo list items
    var items;
    if (todoList) {
        items = todoList.map((ele, index) => 
            <li key={index}>{ele}</li>
        )
    } else {
        items = ''
    }
    // map the weather data into a nice flow
    var weatherApp;
    if (weatherData) {
        weatherApp = (
            <div className='rainBackground'>
                <div>
                    <h3>{time}</h3>
                </div>
                <div className='weatherDailyData'>
                    <h3>Weekly: {weatherData.summary}</h3>
                    <h3>Today: {weatherData.data[0].summary}, H: {weatherData.data[0].temperatureHigh}, L: {weatherData.data[0].temperatureLow}</h3>
                </div>
            </div>
        )
    } else {
        weatherApp =('')
    }

    return (
        <>
            <div className='welcomePage'>
                <div className='weatherStyle'>
                    {weatherApp}
                </div>
                <div className='bottomBoxes'>
                    <div className='calanderPlacer'>
                        <label>Selected Date: {viewDate}</label><br />  
                        <Calendar onChange={onChangeTwo} className='calendar'/><br />
                    </div>
                    <div className='listPlacer'>
                        <div>
                            <h3 className='centerThis'>Todo List</h3>
                        </div>
                        <div className='addItem'>
                            <form onSubmit={handleSubmit}>
                                <label>Add Item</label>{'  '}
                                <input type="text" name='item'/>
                                <input type="submit" value="Submit"/>
                            </form>
                        </div>
                        <div className='itemsOnList'>
                            <ul className='listStyling'>
                                {items}
                            </ul>
                        </div>
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
// 0:
// time: 1579161600
// summary: "Possible drizzle in the morning."
// icon: "rain"
// sunriseTime: 1579189980
// sunsetTime: 1579222140
// moonPhase: 0.74
// precipIntensity: 0.0043
// precipIntensityMax: 0.0266
// precipIntensityMaxTime: 1579215960
// precipProbability: 0.73
// precipType: "rain"
// temperatureHigh: 44.87
// temperatureHighTime: 1579211820
// temperatureLow: 31.92
// temperatureLowTime: 1579271760
// apparentTemperatureHigh: 41.01
// apparentTemperatureHighTime: 1579214580
// apparentTemperatureLow: 27.84
// apparentTemperatureLowTime: 1579250280
// dewPoint: 32.92
// humidity: 0.79
// pressure: 1005
// windSpeed: 5.59
// windGust: 23.93
// windGustTime: 1579161600
// windBearing: 184
// cloudCover: 0.64
// uvIndex: 1
// uvIndexTime: 1579205520
// visibility: 9.705
// ozone: 400.7
// temperatureMin: 32.88
// temperatureMinTime: 1579248000
// temperatureMax: 44.87
// temperatureMaxTime: 1579211820
// apparentTemperatureMin: 27.92
// apparentTemperatureMinTime: 1579248000
// apparentTemperatureMax: 41.01
// apparentTemperatureMaxTime: 1579214580
// __proto__: Object
// 1: {time: 1579248000, summary: "Light rain throughout the day.", icon: "rain", sunriseTime: 1579276320, sunsetTime: 1579308600, …}
// 2: {time: 1579334400, summary: "Light rain until evening.", icon: "rain", sunriseTime: 1579362660, sunsetTime: 1579395060, …}
// 3: {time: 1579420800, summary: "Mostly cloudy throughout the day.", icon: "rain", sunriseTime: 1579449000, sunsetTime: 1579481580, …}
// 4: {time: 1579507200, summary: "Possible drizzle in the afternoon.", icon: "rain", sunriseTime: 1579535340, sunsetTime: 1579568040, …}
// 5: {time: 1579593600, summary: "Light rain throughout the day.", icon: "rain", sunriseTime: 1579621740, sunsetTime: 1579654560, …}
// 6: {time: 1579680000, summary: "Possible drizzle in the morning.", icon: "rain", sunriseTime: 1579708080, sunsetTime: 1579741020, …}
// 7: {time: 1579766400, summary: "Light rain throughout the day.", icon: "rain", sunriseTime: 1579794420, sunsetTime: 1579827540, …}
// length: 8
// __proto__: Array(0)
// __proto__: Object