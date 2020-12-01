const Market = require("../../model/Market");
const Item = require("../../model/Item");
const puppeteer = require('puppeteer');

function getSearchItemUrl(query, pref) {
  if(pref == "none") {
    return `https://www.walmart.com/search/?query=${query}`;
  } else {
    return `https://www.walmart.com/search/?page=1&query=${query}&sort=price_low`;
  }
}

async function getResults(query, pref) {
  const browser = await puppeteer.launch({ headless: false }); // MUST BE FALSE OR WE GET RECAPTCHAd
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 926 });
  await page.goto(getSearchItemUrl(query, pref),{waitUntil: 'networkidle2'});

  let items = [];

  /** @type {string[]} */
  let temp = await page.evaluate(()=>{
    let div = document.querySelectorAll('.search-result-gridview-item');
      console.log(div); // console.log inside evaluate, will show on browser console not on node console
      
      let item = [];
      div.forEach(element => { 
        let name = element.querySelector('[data-type="itemTitles"]');
        if(name != null){
          item.push(name.textContent);
        }

        let price = element.querySelector('[data-type="priceTags"]')
        if(price != null) {
          let str = price.textContent.split('$');
          item.push(str[1]);
        }

        let anchor = element.getElementsByTagName('a')[0];
        if(anchor != null && anchor.href.startsWith("https://www.walmart.com/ip/")) {
          item.push(anchor.href);
        }
      });

      return item;
  })

  let name = ""; // Rewrite == 0
  let price = ""; // Rewrite == 1
  let link = ""; // Add Item after rewriting this == 2

  /** Store Data */
  temp.forEach((data, i) => {
    if(i%3 == 0) {
      name = data;
    } else if (i%3 == 1) {
      price = data;
    } else {
      link = data;
      if(name && price && link) {
        items.push(new Item(name, price, link));
      }
    }
  })

  browser.close();
  return items;
}

module.exports = {
  search: async function (query, pref) {
    try {
      let items = await getResults(query, pref);
      return items;
    } catch (e) {
      return []
    }
  },
};
