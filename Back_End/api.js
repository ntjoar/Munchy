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