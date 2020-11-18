const marketApi = new Map();
const marketSettings = require('./config/marketSettings.json');
const markets = marketSettings.markets;
const marketModulesPath = './Market';

markets.forEach((market) => {
    marketApi.set(market, require(`${marketModulesPath}/${market}/index.js`))
})

const fetch = require("node-fetch");
const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;

app.use(cors())

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:query', async (req, res) => {
    let query = req.params.query;
    let splitQuery = query.split('&')
    //default radius is 0, but radius is in meters!!!!!, SO 2000 RADIUS IS NOT AS BIG AS YOU THINK
    let radius = "0"
    let longitude = "default"
    let latitude = "default"
    let itemsList = []
    //Parse through query to check for radius, longitude, latitude
    for (const words of splitQuery){
        if(words.includes("radius="))
        {
            radius = words.substring(7)
        }
        else if(words.includes("lo="))
        {
            longitude = words.substring(3)
        }
        else if(words.includes("la="))
        {
            latitude = words.substring(3)
        }
        //put all actual searchable items into a list for now
        else{
            itemsList.push(words)
        }
    }
    
    if(longitude == "default" ||latitude == "default")
    {
        console.log("no input for location")
        radius = "0"
    }
    let location = latitude + "," + longitude
    let API_KEY = 'AIzaSyC0WqlCfH7xt2LBwxNeHdmHg8LUM8dhHsE'
    let radInt = parseInt(radius)
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}&location=${location}&radius=${radInt}&keyword=Grocery%20store`
    function getStores(url) {
        fetch(url)
        .then(res => {return res.json()})
        .then((out) => {
            console.log('Checkout this JSON! ',out);
        })
        .catch(err => { throw err });
    }
    let jsonVal = getStores(url)
    console.log(jsonVal)

    //set the query to the first item in list for now as well, this will change later
    query = itemsList[0]
    marketDataArr = []

    for (const [key, module] of marketApi.entries()) {
        let marketData = await module.search(query);
        marketDataArr.push(marketData);
    }

    res.json({
        data: marketDataArr
    });
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));