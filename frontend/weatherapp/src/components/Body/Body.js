import React, {useState}  from 'react'

function Body() {
    const [city, setCity] = useState("")
    const [forecasts, setForeCasts] = useState([])
    
    const cityChangeHandler = (e) => setCity(e.target.value)  
    
    function cityClickHandler(e ){       
        if(city !== ""){
            fetch(`http://localhost:8000/${city}`)             
            .then(res => {
                return res.json() 
                // setForeCasts(res)               
            })
            .then(data => {               
                setForeCasts(data)            
            })
            .catch(err => console.log(err))
        }
      }
      
      


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
            {forecasts && (
                items.map((item) => {
                    console.log(item);
                })
            )}
        </div>
    </div>
  )
}

export default Body