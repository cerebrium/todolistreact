import React, { useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import axios from 'axios'
import { ReactMic } from 'react-mic'
import SpeechRecognition from "react-speech-recognition"
import PropTypes from "prop-types";
import './App.css'

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
};

const WelcomePage = (props, transcript, resetTranscript, startListening, browserSupportsSpeechRecognition) => {
    const [ isBlocked, setIsBlocked ] = useState(false)
    const [dateSelected, setDateSelected] = useState(new Date())
    const [ record, setRecord] = useState(false)
    const [viewDate, setViewDate] = useState('')
    const [ time, setTime ] = useState('')
    const [ weatherData, setWeatherData ] = useState(null)
    const [ todoList, setTodoList ] = useState([])
    const [ currDateEvents, setCurrDateEvents ] = useState([])

    // Defining the outer speechrecognition container
    const recognition = new SpeechRecognition()

    // Make The date into a string so can be passed to state
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then( (info) => {
            if (info.active) {
                setIsBlocked(true)
            } 
        })
        .catch(function(err) {
            console.log(err)
        });
        setTodoList(props.user.todo)
        let initialDate = dateSelected.toDateString()
        setViewDate(initialDate)
        axios.get('/api/weather').then( response => {
            setWeatherData(response.data)
        })
        let theTime = dateSelected.toTimeString()
            setTime(theTime)    
    }, [])

    // start recording
    const startRecording = () => {
        setRecord(true)
        props.resetTranscript()
        props.startListening()
    }

    // Stop Recording
    const stopRecording = (ev) => {
        ev.preventDefault()
        setRecord(false)
        props.stopListening()
        setTimeout(() => {
            props.resetTranscript()
        }, 10000)
    }

    // Real Time blob recording in process
    const onData = (recordedBlob) => {
        console.log('');
    }
    
    // If blob is done recording here it is
    const onStop = (recordedBlob) => {
        console.log('')
    }

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
        if (record === false) {
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
                            <ReactMic record={record} className="sound-wave" onStop={onStop} onData={onData}/>
                        </div>
                        <div className='addItem'>
                            <form onSubmit={handleSubmit}>
                                <label>Record to add Item</label>{'  '}
                                <input type="text" name='item' value={props.transcript} className='inputBar'/><br />
                                <button onClick={startRecording} className='submitButtonTwo'>
                                    RECORD
                                </button>
                                <button onClick={stopRecording} className='submitButtonThree'>
                                    Stop
                                </button>
                                    <input type="submit" value="Add Item" id='submitButton'/>
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

// options for the speech recognition api
const options = {
    autoStart: false
  }

WelcomePage.prototype = propTypes

export default SpeechRecognition(options)(WelcomePage)
