import { useEffect, useState } from 'react';
import Cloudy from '../../assets/cloudy.png'
import './header.scss'
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Header({ searchInput, setdarktheme, darkTheme, setIconColor }) {
    const [fullTime, setFullTime] = useState(new Date().toLocaleTimeString())
    const [hours, setHours] = useState(new Date().getHours())
    const [place, setPlace]=useState('')
    const [error, setError]=useState(false)

    useEffect(() => {
        const changetime = setInterval(() => {
            setFullTime(new Date().toLocaleTimeString())
        }, 1000);

        const changeHours = setInterval(() => {
            setHours(new Date().getHours())
        }, 60000);

        // return ()=>clearInterval(changetime)
    }, [])

    async function searchLocation(place) {
        try {
            const res = await axios({
                method: "GET",
                url: `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=10a251fd2b2db596384a2cd822ae016d&units=metric`,
            })
            console.log(res);
            searchInput(res.data)
        } catch (err) {
            console.log("error", err)
            setError(true)
        }
    }

    return (
        <>
            <div>
                <div className='justify-content-between align-items-center logoHeader p-3 pb-0'>
                    <div className='d-flex align-items-center '>
                        <img src={Cloudy} className='logo' alt="" width={'50px'} />
                        <h2 className='fw-bolder m-0 logoTitle'>Weather</h2>
                    </div>
                    <div className='d-flex gap-4 align-items-center themeDiv'>
                        <select className="form-select form-select-sm rounded-pill colorSelect" aria-label="Default select example" onChange={(e)=>{setIconColor(e.target.value)}}>
                            <option value="">default Color</option>
                            <option value="redColor" data-thumbnail="bi bi-circle-fill">&#128308; Red</option>
                            <option value="greenColor">&#128994; Green</option>
                            <option value="blueColor">&#128309; Blue</option>
                        </select>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                // label={theme}
                                onChange={() => { setdarktheme(state => !state) }}
                                className='themeToggleButton'
                            />
                        </Form>
                    </div>
                </div >
                <div className='d-flex justify-content-center'>
                    <div className='d-md-flex align-items-center justify-content-between w-100 subHeader'>
                        <div className='text-center mb-4'>
                            <h5 className='fw-normal m-0 timeHeading'>{hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening'}, {fullTime}</h5 >
                        </div>
                        <div className={`border-bottom d-flex align-items-center mb-4 ${error && 'border-danger'}`}>
                            <Form.Control type="text" className={`border-0 placeInput ${darkTheme && 'colorWhite'} ${error && 'text-danger'}`} value={place} placeholder="Search for location" onChange={(e)=>{setPlace(e.target.value); setError(false)}} onKeyDown={(e)=>{e.keyCode===13 && searchLocation(place)}} />
                            <i className="bi bi-search pe-2 placeSearchIcon" onClick={() => { searchLocation(place) }}></i>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Header