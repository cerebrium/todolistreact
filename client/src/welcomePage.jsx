import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import axios from 'axios'

const WelcomePage = (props) => {
    const [dateSelected, setDateSelected] = useState(new Date())
    const [viewDate, setViewDate] = useState('')
    const [ time, setTime ] = useState('')
    const [ weatherData, setWeatherData ] = useState(null)
    const [ todoList, setTodoList ] = useState([])
    const [ currDateEvents, setCurrDateEvents ] = useState([])

    // Make The date into a string so can be passed to state
    useEffect(() => {
        setTodoList(props.user.todo)
        let initialDate = dateSelected.toDateString()
        setViewDate(initialDate)
        axios.get('/api/weather').then( response => {
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
        // if the state list is not empty
        if (todoList !== undefined) {
            currentList = [...todoList]
            currentList.push({
                listItem: ev.target.item.value,
                date: viewDate
            })
            setTodoList(currentList)

            // axios call to save the entry to db google
            if (props.user.googleuser) {
                axios.post('/auth/googledit', {
                    email: props.user.email,
                    item: {
                        listItem: ev.target.item.value,
                        date: viewDate
                    }
                }).then( response => {
                })
                          
                // axios call to save the entry to db non-google
            } else {
                axios.post('/auth/edit', {
                    email: props.user.email,
                    item: {
                        listItem: ev.target.item.value,
                        date: viewDate
                    }
                }).then( response => {
                })
            }
            ev.target.item.value = ''
            // if the list in state is empty
        } else {
            currentList.push({
                listItem: ev.target.item.value,
                date: viewDate
            })
            setTodoList(currentList)
            ev.target.item.value = ''
        }
    }

    // turn list item red
    var handleMouseEnter = (ev) => {
        ev.target.style.color = 'red'
    }

    // turn list item back to black
    var handleMouseLeave = (ev) => {
        ev.target.style.color = 'black'
    }

    // delete list item
    var handleListClick = (ev) => {
        let theTarget = ev.target.outerHTML
        let myRegexedTarget = theTarget.match(/>\D*</)
        let myfirstTarget = myRegexedTarget[0].replace(/(<|>)/mg, '')
        let myFinalTarget = myfirstTarget.replace('Item: ', '')
        if (props.user.googleuser) {
            axios.post('/auth/googledelete', {
                email: props.user.email,
                item: myFinalTarget
            }).then( response => {
                setTodoList(response.data)
            })
        } else {
            axios.post('/auth/delete', {
                email: props.user.email,
                item: myFinalTarget
            }).then( response => {
                setTodoList(response.data)
            })
        }
    }

    // map the current date events
    var myCurrDates;
    if (currDateEvents) {
        myCurrDates = currDateEvents.map((ele, index) => <h5 key={index}>{ele.listItem}</h5>)
    } else {
        myCurrDates = 'Nothing to do today!'
    }

    // Events for date selected
    useEffect(() => {
        if (todoList) {
            let myArray = []
            todoList.forEach((ele, index) => {
                if (ele.date === viewDate) {
                    myArray.push(ele)
                }
            })
            setCurrDateEvents(myArray)
        }
    }, [viewDate])

    // todo list items
    var items;
    if (todoList) {
        items = todoList.map((ele, index) => 
            <li key={index} className={`listitem${index}`} name={`listitem${index}`} onMouseEnter={handleMouseEnter} onMouseOut={handleMouseLeave} onClick={handleListClick}>Date: {ele.date}<br />Item: {ele.listItem}</li>
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
                    <div className='calanderPlacerTwo'>
                        <h2>Events For: {viewDate}</h2> 
                        <div className='currentScheduledEvents'>{myCurrDates}</div>
                    </div>
                    <div className='calanderPlacer'>
                        <h2>Date Selected: {viewDate}</h2> <br />
                        <Calendar onChange={onChangeTwo} className='calendar'/><br />
                    </div>
                    <div className='listPlacer'>
                        <div>
                            <h2 className='centerThis'>Todo List</h2>
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
