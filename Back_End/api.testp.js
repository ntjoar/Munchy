const marketApi = new Map();
const marketSettings = require('./config/marketSettings.json');
const fetch = require("node-fetch");
const markets = marketSettings.markets;
const marketModulesPath = './Market';

markets.forEach((market) => {
    marketApi.set(market, require(`${marketModulesPath}/${market}/index.js`))
})

async function codeSnippet(query, location) {
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
    //set query as the first item of the list for now
    for(const items of itemsList)
    {
        query = items
        for (const [key, module] of marketApi.entries()) {
            //if the store is not around me skip
            if(!storesAroundMe.includes(key))
                continue;
            let marketData = await module.search(query);
            marketDataArr.push(marketData);
        }
    }

    return marketDataArr;
}

async function main() {
    /** Test Case 1 */
    let data = await codeSnippet("chocolate", "radius=2000&la=34.0689&lo=-118.4452");

    console.log("Test case 1: Add Distance Limitations");
    if(data.length != 1) {
        throw 'Test Case 1 Failed!'
    }
    console.log("Test Case 1 Passed!");

    /** Test Case 2 */
    data = await codeSnippet("brocolli&chicken", "radius=100&la=34.0689&lo=-118.4452");

    console.log("Test case 2: Multiple items");
    if(data.length != 0) {
        throw 'Test Case 2 Failed!'
    }
    console.log("Test Case 2 Passed!");

    /** Test Case 3 */
    data = await codeSnippet("chocolate", "radius=2000&la=default&lo=default");

    console.log("Test case 3: Default Distances");
    if(data.length != 4) {
        throw 'Test Case 3 Failed!'
    }
    console.log("Test Case 3 Passed!");
}

main();