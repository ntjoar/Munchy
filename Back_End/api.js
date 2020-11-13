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


const express = require('express');
const app = express();
var cors = require('cors')
const port = 8000;

//using express Body Parser
app.use(express.json()); 
app.use(express.urlencoded());


app.use(cors())
app.use('/user', require('./routes/Users'));

app.get('/:query', async (req, res) => {
    let query = req.params.query;

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