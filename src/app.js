import { useState } from "react"
import Header from "./component/header/header"
import Home from "./pages/home/home"
import WeatherDetails from "./pages/weatherDetails/weatherDetails"

function App() {
    const [pageNo, setPageNo] = useState(1)
    const [weatherDetails, setWeatherDetails] = useState()
    const [darkTheme, setdarktheme] = useState(false)
    const [iconColor, setIconColor] = useState('')

    function searchInput(data) {
        if (data !== 'error') {
            setWeatherDetails(data)
            setPageNo(2)
        }
    }

    return (
        <>
            <div className={`${darkTheme && 'bodyDarkTheme'} body`}>
                <Header searchInput={searchInput} setdarktheme={setdarktheme} darkTheme={darkTheme} setIconColor={setIconColor} />
                {pageNo === 1 ? <Home /> : <WeatherDetails weatherDetails={weatherDetails} darkTheme={darkTheme} iconColor={iconColor} />}
            </div>
        </>
    )
}
export default App