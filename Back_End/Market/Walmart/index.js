const Market = require('../../model/Market');
const Item = require('../../model/Item');
const axios = require('axios').default;
const cheerio = require('cheerio');
const { http, https } = require('follow-redirects');

function getSearchItemUrl(query) {
    return `https://www.walmart.com/browse/food/chocolate/976759_1096070_1224976?&search_redirect=true&redirectQuery=${query}`;
}

async function fetch(link) {
    return await axios.get(link);
}

async function getHtml(link) {
    return (await fetch(link)).data;
}

async function getResults (query) {
    let items = [];
    // console.log(getSearchItemUrl(query));

    // let html = await axios.get(getSearchItemUrl(query));
    // console.log(getSearchItemUrl(query));
    // const $ = cheerio.load(html);


    // console.log(searchResults.text());
    // searchResults.each((i, element) => {
    //     let elementCheerio = cheerio.load(element);
    //     console.log(elementCheerio.text());

    //     let name = elementCheerio('div.search-result-product-title > .visuallyhidden').text().trim();
    //     console.log(name);
    // })
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

