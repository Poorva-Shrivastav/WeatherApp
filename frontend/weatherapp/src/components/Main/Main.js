import React, { useState } from 'react'
import './Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudSun, faCloudRain, faCloud, faCloudShowersHeavy, faShower, faCloudSunRain } from '@fortawesome/free-solid-svg-icons'

function Main() {
    const [city, setCity] = useState(null)
    const [forecasts, setForeCasts] = useState({})
    const [weatherState, setWeatherState] = useState('')
    const [minTemp, setMinTemp] = useState()
    const [maxTemp, setMaxTemp] = useState()
    const [aggrTemp, setAggrTemp] = useState()
    const [windSpeed, setWindSpeed] = useState()
    const [visibility, setVisibility] = useState()
    const [airPressure, setAirPressure] = useState()
    const [cityId, setCityId] = useState()

    const cityChangeHandler = (e) => {setCity(e.target.value)}

    function cityClickHandler(){ 
        if(city !== ""){
            fetch(`http://localhost:8000/${city}`)             
            .then(res => {
                return res.json()              
            })
            .then(data => {               
                setForeCasts(data) 
                setWeatherState(data.consolidated_weather[0].weather_state_name)                    
                setMinTemp(Math.round(forecasts.consolidated_weather[0].min_temp * 10) / 10)
                setMaxTemp(Math.round(forecasts.consolidated_weather[0].max_temp * 10) / 10)
                setAggrTemp(Math.round(forecasts.consolidated_weather[0].the_temp * 10) / 10)
                setWindSpeed(Math.round(forecasts.consolidated_weather[0].wind_speed * 10) / 10)
                setVisibility(Math.round(forecasts.consolidated_weather[0].visibility * 10) / 10)
                setAirPressure(forecasts.consolidated_weather[0].air_pressure)
                setCityId(forecasts.consolidated_weather[0].id)
                console.log(data.consolidated_weather[0]);
            })
            .catch(err => {
                console.log("City not found")
                setWeatherState()                    
                setMinTemp()
                setMaxTemp()
                setAggrTemp()
                setWindSpeed()
                setVisibility()
                setAirPressure()
                setCityId()
            })
        }        
      }

  return (
    <div>
        <div>
            <h2 id="heading">Weather App</h2>                                 
        </div>
        <div>

            <input id="input-body" type="text" placeholder="Enter City Name" onChange={(e) => cityChangeHandler(e)}/>
            <button id="button-body" type="button" onClick={cityClickHandler}>Enter</button>            
        </div>
        <div>
            {
                !cityId ? (<h1 id="errorMessage">City Not Found</h1>)
            :
                <div className="fontawesome-icons">            
                {
                    weatherState && (
                            weatherState == "Sunny" ? <FontAwesomeIcon className="sunny" icon={faSun} />
                            : weatherState == "Light Cloud" ? <FontAwesomeIcon className="light-cloud" icon={faCloudSun} />
                            : weatherState == "Heavy Cloud" ? <FontAwesomeIcon icon={faCloud} />
                            : weatherState == "Showers" ? <FontAwesomeIcon className="light-cloud" icon={faCloudSunRain} />
                            : weatherState == "Light Rain" ? <FontAwesomeIcon className="light-cloud" icon={faCloudRain} />
                            : weatherState == "Heavy Rain" ? <FontAwesomeIcon icon={faCloudShowersHeavy} />
                            : <FontAwesomeIcon className="clear" icon={faSun} />
                    )

                }
                </div>
            }
            </div>

                <div> 
                {
                    forecasts && (
                        <div className='inner-div-body'>                       
                            <h3 id="city">{city}</h3>
                            <p><span className="span-forecasts">{aggrTemp}&deg;C</span></p>
                            <p>Weather: <span className="span-forecasts">{weatherState}</span></p>
                            
                            <div>
                                <p>Min Tempreature: <span className="span-forecasts">{minTemp}&deg;C</span></p>   
                                <p>Max Tempreature: <span className="span-forecasts">{maxTemp}&deg;C</span></p>
                            </div> 
                            <div>
                                <p>Wind Speed: <span className="span-forecasts">{windSpeed}</span></p>
                                <p>Visibility: <span className="span-forecasts">{visibility}</span></p>
                                <p>Air Pressure: <span className="span-forecasts">{airPressure}</span></p>   
                            </div>
                            
                        </div>
                    )
                              
                }            
            </div>
        
        
    </div>
  )
}

export default Main