const express = require('express');
// const request = require('request');
const cors = require('cors');
const { response } = require('express');
const fetch = require('node-fetch');
const bodyparser = require('body-parser')

const app = express()

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/:city', (req, res) => {   
    const city = req.params.city;    
    // console.log(city);
    let woeid;
    fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(response =>{ return response.json()})
    .then(data => {
      // console.log(data);
      woeid = data[0].woeid
        fetch(`https://www.metaweather.com/api/location/${woeid}/`)
        .then(woeidRes => {return woeidRes.json()})
        .then(woeidData => {
          console.log(woeidData);
          res.send(woeidData)
        })
        .catch(err => {
          res.send({"message":"City Not Found - 1"})
          console.log(err)})
      })
    .catch(err => {
      res.send({"message":"City Not Found - 2"})
      console.log(err)
    })             

    });


// app.get('/weather', function (req, res, next) {
//     const woeid = req.request.woeid;
//     console.log(woeid);
//     request(`https://www.metaweather.com/api/location/44418/`, { json: true }, (err, response, responseData) => {
//       if (err) { return console.log(err); }
//       res.json(responseData)
//       console.log(res.json(responseData));
//     });    
//     });
        
app.listen(8000, ()=>{console.log("listening the port at 8000");})