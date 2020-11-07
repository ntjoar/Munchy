const Market = require('../../model/Market');
const Item = require('../../model/Item');
const axios = require('axios').default;
const cheerio = require('cheerio');
const https = require('https') // Delete this later

function getSearchItemUrl(query) {
    return `https://www.walmart.com/search/?query=${query}`;
}

async function fetch(link) {
    return await axios.get(link);
}

async function getHtml(link) {
    return (await fetch(link)).data;
}

async function getResults (query) {
    var data = (await axios.get('https://www.walmart.com/')).data;
    console.log(data);


    let html = await getHtml(getSearchItemUrl(query));
    const $ = cheerio.load(html);


    console.log(searchResults.text());
    searchResults.each((i, element) => {
        let elementCheerio = cheerio.load(element);
        console.log(elementCheerio.text());

        let name = elementCheerio('div.search-result-product-title > .visuallyhidden').text().trim();
        console.log(name);
    })
    return items;
}

module.exports = {
    search: async function(query) {
        try{
            let items = await getResults(query)
            return new Market('Walmart', 'www.walmart.com', items);
        }
        catch (e) {
            return new Market('Walmart', 'www.walmart.com', []);
        }
    }
}

