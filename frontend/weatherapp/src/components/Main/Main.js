import React, { useState } from 'react'
import './Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudSun, faCloudRain, faCloud, faCloudShowersHeavy, faShower, faCloudSunRain } from '@fortawesome/free-solid-svg-icons'

function Main() {
    const [city, setCity] = useState(null)
    const [forecasts, setForeCasts] = useState({})
    const [weatherState, setWeatherState] = useState([])
    const [minTemp, setMinTemp] = useState([])
    const [maxTemp, setMaxTemp] = useState([])
    const [aggrTemp, setAggrTemp] = useState([])
    const [windSpeed, setWindSpeed] = useState([])
    const [visibility, setVisibility] = useState([])
    const [airPressure, setAirPressure] = useState([])
    const [cityId, setCityId] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [displayError, setDisplayError] = useState(false)

    const cityChangeHandler = (e) => {setCity(e.target.value)}

    const resetHandler = () => {
                setCity('')
                setWeatherState([])                    
                setMinTemp([])
                setMaxTemp([])
                setAggrTemp([])
                setWindSpeed([])
                setVisibility([])
                setAirPressure([])
                setCityId(false)
                setIsLoading(false)
                setDisplayError(true) 
    }

    function cityClickHandler(){ 
        setIsLoading(true)
        if(city !== ""){
            fetch(`http://localhost:8000/${city}`)             
            .then(res => {
                return res.json()              
            })
            .then(data => { 
                console.log(data.consolidated_weather[0]);              
                setForeCasts(data) 
                setCityId(true)                                    
                    setWeatherState(data.consolidated_weather[0].weather_state_name)                             
                    setMinTemp(Math.round(data.consolidated_weather[0].min_temp * 10) / 10)
                    setMaxTemp(Math.round(data.consolidated_weather[0].max_temp * 10) / 10)
                    setAggrTemp(Math.round(data.consolidated_weather[0].the_temp * 10) / 10)
                    setWindSpeed(Math.round(data.consolidated_weather[0].wind_speed * 10) / 10)
                    setVisibility(Math.round(data.consolidated_weather[0].visibility * 10) / 10)
                    setAirPressure(data.consolidated_weather[0].air_pressure)                
                setIsLoading(false)
                setDisplayError(false)
                
            })
            .catch(err => {
                console.log("City not found")
                console.log(err);
                setWeatherState()                    
                setMinTemp()
                setMaxTemp()
                setAggrTemp()
                setWindSpeed()
                setVisibility()
                setAirPressure()
                setCityId(false)
                setIsLoading(false)
                setDisplayError(true)                
            })
        }        
      }

  return (
    <div className='main-div'>
        <div>
            {/* <h2 id="heading">Weather App</h2>                                  */}
        </div>
        <div className="div-middle">

            <input id="input-body" type="text" placeholder="City Name e.g. Mumbai" onChange={(e) => cityChangeHandler(e)}/>
            <button className="button-body" type="button" onClick={cityClickHandler}>Search</button>            
        </div>
        
        <div>
            {isLoading &&  <h3 id="loading">Loading...</h3>}
            {
                cityId ?                                          
                    <div className='inner-div-body'> 
                    <div className="fontawesome-icons temp-weatherstate">  
                { weatherState && (
                            weatherState == "Sunny" ? <FontAwesomeIcon className="clear" icon={faSun} />
                            : weatherState == "Light Cloud" ? <FontAwesomeIcon className="light-cloud" icon={faCloudSun} />
                            : weatherState == "Heavy Cloud" ? <FontAwesomeIcon icon={faCloud} />
                            : weatherState == "Showers" ? <FontAwesomeIcon className="light-cloud" icon={faCloudSunRain} />
                            : weatherState == "Light Rain" ? <FontAwesomeIcon className="light-cloud" icon={faCloudRain} />
                            : weatherState == "Heavy Rain" ? <FontAwesomeIcon icon={faCloudShowersHeavy} />
                            : weatherState == "Clear" ? <FontAwesomeIcon className="clear" icon={faSun} />
                            : null
                )
                }
                </div> 
                    <div className='inner-div temp-weatherstate'>
                        <p><span className="temp">{aggrTemp}&deg;C</span></p>
                        <p><span className="span-forecasts weatherState">{weatherState}</span></p>
                    </div>
                    <div className='inner-div'>
                        <p>Min Tempreature: <span className="span-forecasts">{minTemp}&deg;C</span></p>   
                        <p>Max Tempreature: <span className="span-forecasts">{maxTemp}&deg;C</span></p>
                    </div> 
                    <div className='inner-div'>
                        <p>Wind Speed: <span className="span-forecasts">{windSpeed}</span></p>
                        <p>Visibility: <span className="span-forecasts">{visibility}</span></p>
                        <p>Air Pressure: <span className="span-forecasts">{airPressure}</span></p>   
                    </div> 
                                          
                 
            </div>
            : (<h1 className={displayError ? "errorMessage": "display-none"}>City Not Found</h1>)
        } 
        </div>
                                                                    
     
    </div>
  )
}

export default Main