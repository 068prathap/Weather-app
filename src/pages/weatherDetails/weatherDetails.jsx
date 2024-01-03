import './weatherDetails.scss'

function WeatherDetails({ weatherDetails }) {
    return (
        <>
            <div>
                <div>
                    <div className='d-flex'>
                        <i className="bi bi-geo-alt"></i>
                        <p>{weatherDetails.name}/{weatherDetails.sys.country}</p>
                    </div>
                    <div className='d-flex'>
                        <i className="bi bi-calendar3"></i>
                        <p>Tuesday, 2 January 2024</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default WeatherDetails