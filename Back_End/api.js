const marketApi = new Map();
const marketSettings = require("./config/marketSettings.json");
const markets = marketSettings.markets;
const marketModulesPath = "./Market";
const connectMongo = require("./config/DbConnection");
require("dotenv").config({ path: "./config/config.env" });
connectMongo();

markets.forEach((market) => {
  marketApi.set(market, require(`${marketModulesPath}/${market}/index.js`));
});

const fetch = require("node-fetch");
const express = require("express");
const app = express();
var cors = require("cors");
const Market = require("./model/Market");
const Items = require("./model/Items");
// const { parse } = require('dotenv/types');
const port = 8000;

//using express Body Parser
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use("/user", require("./routes/Users"));
app.use("/recipe", require("./routes/Recipe"));

app.get("/favicon.ico", (req, res) => res.status(204));

async function parseWebsites(query, location, storePref, pref) {
  marketDataArr = [];

  let locationStr = location.split("&");
  let itemStr = query.split("&");
  let queryRet = pref.split("&");
  let stores = storePref.split("&");
  //default radius is 0, but radius is in meters!!!!!, SO 2000 RADIUS IS NOT AS BIG AS YOU THINK
  //problem here, is that google places API only returns 20, so too big of a radius and it'll sort of be irrelevant how large you make it
  let radius = "0";
  let longitude = "default";
  let latitude = "default";
  let itemsList = [];

  //set the query to the first item in list for now as well, this will change later
  for (const food of itemStr) {
    itemsList.push(food);
  }
  //Parse through query to check for radius, longitude, latitude
  for (const words of locationStr) {
    if (words.includes("radius=")) {
      radius = words.substring(7);
    } else if (words.includes("lo=")) {
      longitude = words.substring(3);
    } else if (words.includes("la=")) {
      latitude = words.substring(3);
    }
    //put all actual searchable items into a list for now
    else {
      itemsList.push(words);
    }
  }

  if (longitude == "default" || latitude == "default") {
    radius = "0";
  }
  //example api localhost:8000/radius=2000&la=34.0689&lo=-118.4452&brocolli
  //http://localhost:8000/radius=2000&la=34.0689&lo=-118.4452/brocolli&chicken/Ralphs&Walmart&Costco&Food4Less/1

  //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0689,118.4452&radius=2000&type=grocery%20store&key=AIzaSyC0WqlCfH7xt2LBwxNeHdmHg8LUM8dhHsE&location

  let position = latitude + "," + longitude;
  let API_KEY = "AIzaSyC0WqlCfH7xt2LBwxNeHdmHg8LUM8dhHsE";
  //convert radius from m to miles
  let radMeters = parseFloat(radius);
  radMeters = radMeters * 1609.34;

  possibleStoreList = [];
  //store the possible store lists that we will find in google places API
  for (var i = 0; i < stores.length; i++) {
    possibleStoreList.push(stores[i]);
  }
  // console.log(stores)
  // console.log(possibleStoreList)

  var storesAroundMe = [];
  //set the var for the google places API
  for (var i = 0; i < possibleStoreList.length; i++) {
    let storeName = possibleStoreList[i];
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${API_KEY}&location=${position}&radius=${radMeters}&name=${storeName}`;
    //var possibleStoreList = ["Walmart", "Food4Less", "Ralphs", "Costco"]
    await fetch(url)
      .then((res) => res.json())
      .then((out) => {
        //parse JSON to check if Walmart, Food4Less, Ralphs, Costco is within range
        let jsonVal = out;
        //console.log(jsonVal)
        //go through the list of results
        // console.log(jsonVal["results"].length)
        if (jsonVal["results"].length > 0) {
          storesAroundMe.push(storeName);
        }
      })
      .catch((err) => {
        throw err;
      });
  }
  //If given no long no lat, check for all stores
  if (longitude == "default" || latitude == "default") {
    storesAroundMe = possibleStoreList;
  }
  // console.log(storesAroundMe)
  /** Initialize Markets that can be scraped */
  marketDataArr.push(new Market("Costco", "https://www.costco.com/", []));
  marketDataArr.push(new Market("Walmart", "https://www.walmart.com/", []));
  marketDataArr.push(new Market("Ralphs", "https://www.ralphs.com/", []));
  marketDataArr.push(new Market("Food4Less", "https://www.food4less.com/", []));

  //set query as the first item of the list for now
  for (const items of itemsList) {
    query = items;
    for (const [key, module] of marketApi.entries()) {
      //if the store is not around me skip
      if (!storesAroundMe.includes(key)) continue;
      let marketData = await module.search(query, queryRet);

      /** Add specifically to that store's query, don't create new and waste obj space */
      for (i in marketDataArr) {
        if (marketDataArr[i]["name"] == key) {
          marketDataArr[i]["items"].push(
            new Items(query.replace("%20", " "), marketData)
          );
        }
      }
    }
  }

  return marketDataArr;
}

app.get("/:location/:query/:storePref/:pref", async (req, res) => {
  res.json({
    data: await parseWebsites(
      req.params.query,
      req.params.location,
      req.params.storePref,
      req.params.pref
    ),
  });
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

module.exports = {
  parseWebsites: parseWebsites,
};
