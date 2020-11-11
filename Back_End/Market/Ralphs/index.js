const axios = require('axios').default;
const cheerio = require('cheerio');
const Item = require('../../model/Item');
const Market = require('../../model/Market');

function getSearchItemUrl(query) {
    return `https://www.ralphs.com/search?query=${query}&searchType=default_search&fulfillment=all`;
}

async function fetch(link) {
    return await axios.get(link);
}

async function getHtml(link) {
    return (await fetch(link)).data;
}

async function getResults(query) {
    let html = await getHtml(getSearchItemUrl(query));
    const $ = cheerio.load(html);

    const items = [];

    let searchResults = $('div.ProductGridContainer > div.PaginateItems > div.AutoGrid > div.AutoGrid-cell');
    searchResults.each((i, element) => {
        let elementCheerio = cheerio.load(element);

        let name = elementCheerio('.kds-Text--l').text().trim();
        let link = "https://www.ralphs.com" + elementCheerio('.flex-grow > a').attr('href').trim();
        let price = elementCheerio('.kds-Price').text().trim().substr(1).split(" ")[0];

        console.log(i);
        console.log(new Item(name, price, link));

        items.push(new Item(name, price, link));

        if(i > 28) {
            console.log("test"); // Necessary for whatever reason
            return false;
        }
    });

    console.log("test");

    return items;
}

module.exports = {
    search: async function(query){
        try {
            let items = await getResults(query)
            return new Market('Ralphs', 'www.ralphs.com', items)
        } catch (e) {
            return new Market('Ralphs', 'www.ralphs.com', [])
        }
    }
}
