import './home.scss'
import IntroImage from '../../assets/introImage.png'

function Home() {
    return (
        <>
            <div className='text-center'>
                <img src={IntroImage} className='introImage' alt="" width={'400px'} />
                <h2 className='text-primary mt-5'>Welcome! Enter a location to get weather information</h2>
            </div>
        </>
    )
}
export default Home