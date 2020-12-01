const marketApi = new Map();
const marketSettings = require('./config/marketSettings.json');
const markets = marketSettings.markets;
const marketModulesPath = './Market';
const connectMongo = require('./config/DbConnection')
require('dotenv').config({path: './config/config.env'})
connectMongo();

markets.forEach((market) => {
    marketApi.set(market, require(`${marketModulesPath}/${market}/index.js`))
})

const fetch = require("node-fetch");
const express = require('express');
const app = express();
var cors = require('cors');
const Market = require('./model/Market');
const Items = require('./model/Items');
// const { parse } = require('dotenv/types');
const port = 8000;

//using express Body Parser
app.use(express.json()); 
app.use(express.urlencoded());


app.use(cors())
app.use('/user', require('./routes/Users'));
app.use('/recipe', require('./routes/Recipe'));

app.get('/favicon.ico', (req, res) => res.status(204));

async function parseWebsites(query, location) {
    marketDataArr = [];

    let locationStr = location.split('&')
    let itemStr = query.split('&')
    //default radius is 0, but radius is in meters!!!!!, SO 2000 RADIUS IS NOT AS BIG AS YOU THINK
    //problem here, is that google places API only returns 20, so too big of a radius and it'll sort of be irrelevant how large you make it
    let radius = "0"
    let longitude = "default"
    let latitude = "default"
    let itemsList = []

    //set the query to the first item in list for now as well, this will change later
    for (const food of itemStr){
        itemsList.push(food)
    }
    //Parse through query to check for radius, longitude, latitude
    for (const words of locationStr){
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
        radius = "0"
    }
    //example api localhost:8000/radius=2000&la=34.0689&lo=-118.4452&brocolli
    

    /*TODO
    change query parameter
    form a response
    "items": [
    "items": 
        "query" : "brocolli",
        "itemData" : [
        {
          "name": "Heartland Fresh Antibiotic-Free Chicken Wellington with Wild Rice & Mushroom Duxelle, 8 X 9 oz, 4.5 lbs.",
          "price": "74.99",
          "link": "https://www.costco.com/heartland-fresh-antibiotic-free-chicken-wellington-with-wild-rice-%2526amp%3b-mushroom-duxelle%2c-8-x-9-oz%2c-4.5-lbs..product.100698772.html"
        }
        ]
    ]
    //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0689,118.4452&radius=2000&type=grocery%20store&key=AIzaSyC0WqlCfH7xt2LBwxNeHdmHg8LUM8dhHsE&location
    */
    // /la=37.000&lo=32.000&rad=2000/query=brocolli&spinach&chocolate

    let position = latitude + "," + longitude
    let API_KEY = 'AIzaSyC0WqlCfH7xt2LBwxNeHdmHg8LUM8dhHsE'
    let radInt = parseInt(radius)
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}&location=${position}&radius=${radInt}&keyword=Grocery%20store`
    var possibleStoreList = ["Walmart", "Food4Less", "Ralphs", "Costco"]
    var storesAroundMe = []
    await fetch(url)
        .then(res => res.json())
        .then(out => {
             //parse JSON to check if Walmart, Food4Less, Ralphs, Target is within range
             let jsonVal = out
             //go through the list of results
             for(var i = 0; i < jsonVal["results"].length; i++)
             {
                //check if the resulting grocery stores include the names of any of the possible stores
                for(var j = 0; j < possibleStoreList.length; j++)
                {
                    //if the store is a valid store, add it to our list of stores near us, problem would be if some store named TargetStuff 
                    // even if its not a target store, we'd include target, we might have to update this to deal with that, but ignore for now
                    if(jsonVal["results"][i]["name"].includes(possibleStoreList[j]))
                    {
                        storesAroundMe.push(possibleStoreList[j]);
                    }
                }
            }
        })
        .catch(err => { throw err });

        if(longitude == "default" ||latitude == "default")
        {
            storesAroundMe = possibleStoreList;
        }

    /** Initialize Markets that can be scraped */
    marketDataArr.push(new Market("Costco", "https://www.costco.com/", []));
    marketDataArr.push(new Market("Walmart", "https://www.walmart.com/", []));
    marketDataArr.push(new Market("Ralphs", "https://www.ralphs.com/", []));
    marketDataArr.push(new Market("Food4Less", "https://www.food4less.com/", []));

    //set query as the first item of the list for now
    for(const items of itemsList)
    {
        query = items
        for (const [key, module] of marketApi.entries()) {
            //if the store is not around me skip
            if(!storesAroundMe.includes(key))
                continue;
            let marketData = await module.search(query);

            /** Add specifically to that store's query, don't create new and waste obj space */
            for (i in marketDataArr) {
                if(marketDataArr[i]["name"] == key) {
                    marketDataArr[i]["items"].push(new Items(query.replace("%20", " "), marketData));
                }
            }
        }
    }

    return marketDataArr;
}

app.get('/:location/:query', async (req, res) => {
    res.json({
        data: await parseWebsites(req.params.query, req.params.location)
    });
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

module.exports = {
    parseWebsites: parseWebsites
}