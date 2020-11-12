const marketApi = new Map();
const marketSettings = require('./config/marketSettings.json');
const markets = marketSettings.markets;
const marketModulesPath = './Market';

markets.forEach((market) => {
    marketApi.set(market, require(`${marketModulesPath}/${market}/index.js`))
})

const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;

app.use(cors())

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:query', async (req, res) => {
    let query = req.params.query;
<<<<<<< HEAD
    let splitQuery = query.split('&')
    //default radius is 0
    let radius = "0"
    let longitude = "default"
    let latitude = "default"
    for (const words of splitQuery){
        if(words.includes("radius="))
        {
            radius = words.substring(7)
        }
        if(words.includes("lo="))
        {
            longitude = words.substring(3)
        }
        if(words.includes("la="))
        {
            latitude = words.substring(3)
        }
    }
    if(longitude == "default" ||latitude == "default")
    {
        console.log("no input for location")
        radius = "0"
    }
=======
>>>>>>> 7f4dbb6f85988a92726b54290e70e16019be5a2e
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