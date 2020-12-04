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

function price(obj) { //convert obj.price to float
    return parseFloat(obj.price.replace(/[^\.\d]/g, ''));
}

async function getResults(query, pref) {
    let html = await getHtml(getSearchItemUrl(query));
    const $ = cheerio.load(html);

    const items = [];

    let searchResults = $('div.ProductGridContainer > div.PaginateItems > div.AutoGrid > div.AutoGrid-cell > div.ProductCard');
    searchResults.each((i, element) => {
        let elementCheerio = cheerio.load(element);

        let name = elementCheerio('.kds-Text--l').text().trim();
        let link = "https://www.ralphs.com" + elementCheerio('.flex-grow > a').attr('href').trim();
        let price = elementCheerio('.kds-Price').text().trim().substr(1).split(" ")[0];
        if(price == "bout") {
            price = elementCheerio('.kds-Price').text().trim().substr(1).split(" ")[1].substr(1);
        }

        items.push(new Item(name, price, link));
    });

    return items;
}

module.exports = {
    search: async function(query, pref){
        try {
            let items = await getResults(query, pref);
            if(pref != "none") {
                return items.sort(function (a, b) {
                    return price(a)-price(b);
                });
            }
            return items;
        } catch (e) {
            return [];
        }
    }
}
