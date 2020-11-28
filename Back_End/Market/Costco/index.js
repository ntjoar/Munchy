const axios = require('axios').default;
const cheerio = require('cheerio');
const Item = require('../../model/Item');
const Market = require('../../model/Market');

function getSearchItemUrl(query) {
    return `https://www.costco.com/CatalogSearch?keyword=${query}&dept=All`;
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

    let searchResults = $('div.product > div.product-tile-set > div.thumbnail');
    searchResults.each((i, element) => {
        let elementCheerio = cheerio.load(element);

        let name = elementCheerio('.description').text().trim();
        let link = elementCheerio('.description > a').attr('href').trim();
        let price = elementCheerio('.price').text().trim().substr(1);

        items.push(new Item(name, price, link))
    });

    return items;
}

module.exports = {
    search: async function(query){
        try {
            let items = await getResults(query)
            return items;
        } catch (e) {
            return []
        }
    }
}
