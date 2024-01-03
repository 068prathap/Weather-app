import { useEffect, useState } from 'react';
import Cloudy from '../../assets/cloudy.png'
import './header.scss'
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function Header({ searchInput }) {
    const [theme, setTheme] = useState('Dark')
    const [fullTime, setFullTime] = useState(new Date().toLocaleTimeString())
    const [hours, setHours] = useState(new Date().getHours())

    useEffect(() => {
        const changetime = setInterval(() => {
            setFullTime(new Date().toLocaleTimeString())
        }, 1000);

        const changeHours = setInterval(() => {
            setHours(new Date().getHours())
        }, 60000);

        // return ()=>clearInterval(changetime)
    }, [])

    async function searchLocation() {
        try {
            const res = await axios({
                method: "GET",
                url: "https://api.openweathermap.org/data/2.5/weather?q=coimbatore&appid=10a251fd2b2db596384a2cd822ae016d&units=metric",
            })
            console.log(res);
            searchInput(res.data)
        } catch (err) {
            console.log("error", err)
            searchInput('error')
        }
    }

    return (
        <>
            <div>
                <div className='justify-content-between align-items-center logoHeader m-3 mb-0'>
                    <div className='d-flex align-items-center '>
                        <img src={Cloudy} className='logo' alt="" width={'50px'} />
                        <h2 className='fw-bolder m-0 logoTitle'>Weather</h2>
                    </div>
                    <div className='d-flex gap-4 align-items-center themeDiv'>
                        <select className="form-select form-select-sm colorSelect" aria-label="Default select example">
                            <option value="">default Color</option>
                            <option value="red" data-thumbnail="bi bi-circle-fill">&#128308; Red</option>
                            <option value="green">&#128994; Green</option>
                            <option value="blue">&#128309; Blue</option>
                        </select>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                // label={theme}
                                onChange={() => { setTheme(state => state === 'Dark' ? 'Light' : 'Dark') }}
                                className='themeToggleButton'
                            />
                        </Form>
                    </div>
                </div >
                <div className='d-flex justify-content-center'>
                    <div className='m-5 mb-0 d-md-flex align-items-center justify-content-between w-100'>
                        <div className='text-center mb-4'>
                            <h5 className='fw-normal m-0 timeHeading'>{hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening'}, {fullTime}</h5 >
                        </div>
                        <div className='border-bottom d-flex align-items-center mb-4'>
                            <Form.Control type="text" className='border-0 placeInput' placeholder="Search for location" />
                            <i className="bi bi-search pe-2 placeSearchIcon" onClick={() => { searchLocation() }}></i>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Header