import './forecastCard.scss'
import ForecastCardImg from '../../assets/forecastCardImg.png'

function ForecastCard({ details, darkTheme, iconColor }) {
    let time = details.dt_txt.split(' ')[1].split(':')
    time.push(+time[0] < 12 ? ' AM' : ' PM');
    time[0] = +time[0] % 12 || 12;

    return (
        <>
            <div className={`border border-dark rounded-4 p-3 position-relative h-100 ${darkTheme && 'darkCardInner'}`}>
                <div className='text-center'>
                    <img src={ForecastCardImg} className={`p-3 rounded-circle ${iconColor==='redColor' ? 'bg-danger' : iconColor==='greenColor' ? 'bg-success' : iconColor==='blueColor' ? 'bg-primary' : 'bg-dark'}`} alt="" width={'90px'} />
                </div>
                <div className='text-center'>
                    <h4 className='fs-5 '>{details.weather[0].description}</h4>
                </div>
                <div className='text-center position-absolute bottom-0 w-100 start-0 pb-3'>
                    <p className={`pb-2 fw-bold ${iconColor}`}>{details.main.temp}°C</p>
                    <p>{details.dt_txt.split(' ')[0]}</p>
                    <p>{time.join(':')}</p>
                </div>
            </div>
        </>
    )
}
export default ForecastCard