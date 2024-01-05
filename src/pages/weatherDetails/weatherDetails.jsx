import './weatherDetails.scss'
import TempImg from '../../assets/tempImg.png'
import HazeImg from '../../assets/hazeImg.png'
import { useEffect, useState } from 'react';
import axios from 'axios';
import ForecastCard from '../../component/forecastCard/forecastCard';
import MapShow from '../../component/map/map';

function WeatherDetails({ weatherDetails, darkTheme, iconColor }) {
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    const [forecastList, setforecastList] = useState([])

    let date = new Date(weatherDetails.sys.sunrise * 1000);
    let convert = date.toTimeString().split(' ');
    const sunrise = convert[0]

    date = new Date(weatherDetails.sys.sunset * 1000);
    convert = date.toTimeString().split(' ');
    const sunset = convert[0]

    const directions = [['North', <i className="bi bi-arrow-up-circle"></i>], ['North East', <i className="bi bi-arrow-up-right-circle"></i>], ['East', <i className="bi bi-arrow-right-circle"></i>], ['South East', <i className="bi bi-arrow-down-right-circle"></i>], ['South', <i className="bi bi-arrow-down-circle"></i>], ['South West', <i className="bi bi-arrow-down-left-circle"></i>], ['West', <i className="bi bi-arrow-left-circle"></i>], ['North West', <i className="bi bi-arrow-up-left-circle"></i>]];
    const index = Math.round((weatherDetails.wind.deg % 360) / 45);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `https://api.openweathermap.org/data/2.5/forecast?q=${weatherDetails.name}&appid=10a251fd2b2db596384a2cd822ae016d&units=metric`,
                })
                console.log(res.data.list);

                const list = res.data.list
                const newList = list.filter((obj, index) => {
                    let date = obj.dt_txt.split(' ').join('T')
                    const then = new Date(date);
                    const now = new Date();
                    const msBetweenDates = (then.getTime() - now.getTime());
                    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
                    if (hoursBetweenDates < 24 && hoursBetweenDates > 0) {
                        return obj
                    }
                })

                setforecastList(newList)
            } catch (err) {
                console.log("error", err)
            }
        })()
    }, [])

    return (
        <>
            <div className='weatherDetails'>
                <div className='subMainDiv'>
                    <div className='w-100 d-flex justify-content-center mt-4'>
                        <div className='gap-4 d-flex flex-column'>
                            <div className='d-flex fs-2'>
                                <i className={`bi bi-geo-alt ${iconColor}`}></i>
                                <p className='ps-2'>{weatherDetails.name} / {weatherDetails.sys.country}</p>
                            </div>
                            <div className='d-flex fs-6 ps-2'>
                                <i className={`bi bi-calendar3 ${iconColor}`}></i>
                                <p className='ps-2'>{dayList[new Date().getDay()]}, {new Date().getDate()} {monthList[new Date().getMonth()]} {new Date().getFullYear()}</p>
                            </div>
                            <div className='d-flex mt-4 ps-2'>
                                <div>
                                    <p className='fs-1 fw-bold'>{weatherDetails.main.temp}</p>
                                    <p className='fs-5'>Feels Like: {weatherDetails.main.feels_like}</p>
                                </div>
                                <div className='ps-3'>
                                    <img src={TempImg} alt="" width={'100px'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-4'>
                        <div className='text-center'>
                            <img src={HazeImg} className='shadow-lg bg-body rounded-circle' alt="" width={'195px'} />
                            <p className='mt-4 fw-bold fs-2'>{weatherDetails.weather[0].main}</p>
                        </div>
                    </div>
                </div>
                <div className='subMainDiv'>
                    <div className='d-flex justify-content-center mapOuter'>
                        <MapShow lon={weatherDetails.coord.lon} lat={weatherDetails.coord.lat} />
                    </div>
                    <div className='w-100 d-flex justify-content-center mt-4'>
                        <div className='fs-3 gap-1 d-flex flex-column'>
                            <p><i className={`bi bi-sunrise pe-3 ${iconColor}`}></i> Sunrise: {sunrise} AM</p>
                            <p><i className={`bi bi-sunset pe-3 ${iconColor}`}></i> Sunset: {sunset} PM</p>
                            <p><i className={`bi bi-moisture pe-3 ${iconColor}`}></i> Humidity: {weatherDetails.main.humidity}%</p>
                            <p><i className={`bi bi-wind pe-3 ${iconColor}`}></i> Wind Speed: {weatherDetails.wind.speed}k/hr</p>
                            <p><i className={`bi bi-arrow-bar-up pe-3 ${iconColor}`}></i> Pressure: {weatherDetails.main.pressure}mb</p>
                            <p><i className={`bi bi-compass pe-3 ${iconColor}`}></i> Direction: {directions[index % 8][0]} {directions[index % 8][1]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <h2 className='text-center mb-4'>Next 24 hours Forecast</h2>
                <div className='d-flex flex-wrap justify-content-center'>
                    {
                        forecastList.map((details, index) => {
                            return (
                                <div className='forecastCard p-2' key={index}>
                                    <ForecastCard details={details} darkTheme={darkTheme} iconColor={iconColor} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default WeatherDetails