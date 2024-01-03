import { useState } from "react"
import Header from "./component/header/header"
import Home from "./pages/home/home"
import WeatherDetails from "./pages/weatherDetails/weatherDetails"

function App() {
    const [pageNo, setPageNo] = useState(1)
    const [weatherDetails, setWeatherDetails] = useState()

    function searchInput(data) {
        if (data !== 'error') {
            setWeatherDetails(data)
            setPageNo(2)
        }
    }

    return (
        <>
            <Header searchInput={searchInput} />
            {pageNo === 1 ? <Home /> : <WeatherDetails weatherDetails={weatherDetails} />}
        </>
    )
}
export default App