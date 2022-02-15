import React, {useState}  from 'react'

function Body() {
    const [city, setCity] = useState("")
    const [forecasts, setForeCasts] = useState({})
    
    const cityChangeHandler = (e) => setCity(e.target.value)  
    
    function cityClickHandler(e ){       
        if(city !== ""){
            fetch(`http://localhost:8000/${city}`)             
            .then(res => {
                return res.json()              
            })
            .then(data => {               
                setForeCasts(data)                      
            })
            .catch(err => console.log(err))
        }        
      }

    //   console.log(forecasts.consolidated_weather[0] );
    
    //   let minTemp = Math.round(forecasts.consolidated_weather[0].min_temp * 10) / 10
    //   let maxTemp = Math.round(forecasts.consolidated_weather[0].max_temp * 10) / 10
    //   let aggrTemp = Math.round(forecasts.consolidated_weather[0].the_temp * 10) / 10
    //   let windSpeed = Math.round(forecasts.consolidated_weather[0].wind_speed * 10) / 10
    //   let visibility = Math.round(forecasts.consolidated_weather[0].visibility * 10) / 10
    //   let airPressure = forecasts.consolidated_weather[0].airpressure
      
  return (
    <div>
        <div>
            <h2>Weather App</h2>
        </div>
        <div>
            <input type="text" placeholder="Enter City Name"onChange={cityChangeHandler}/>
            <button type="button" onClick={cityClickHandler}>Enter</button>
        </div>
        <div> 
            {
                forecasts && (
                    <>
                    <h3>City: {city}</h3>
                    <p>Min Tempreature: {forecasts.consolidated_weather[0].min_temp}</p>   
                    <p>Max Tempreature: {forecasts.consolidated_weather[0].max_temp}</p>
                    <p>Aggr Tempreature: {forecasts.consolidated_weather[0].the_temp}</p>
                    <p>Wind Speed: {forecasts.consolidated_weather[0].wind_speed}</p>
                    <p>Visibility: {forecasts.consolidated_weather[0].visibility}</p>
                    <p>Air Pressure: {forecasts.consolidated_weather[0].air_pressure}</p>   
                    </>
                )
            }

            {
                !forecasts && (
                    <h3>Data not found</h3>
                )
            }
                    
        </div>
    </div>
  )
}

export default Body