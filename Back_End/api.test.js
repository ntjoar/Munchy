const api = require('./api.js');

async function main() {
    /** Test Case Group 1 */
    let data = await api.parseWebsites("chocolate", "radius=2000&la=34.0689&lo=-118.4452", "Walmart", "none");

    console.log("Test case Group 1 (Single item, single store):");
    console.log("Test case 1.1 Unsorted");
    if(data[0]["items"].length != 0 || data[1]["items"].length != 1 || 
       data[2]["items"].length != 0 || data[3]["items"].length != 0) {
        throw 'Test Case 1.1 Failed!'
    }
    console.log("Test Case 1.1 Passed!");

    data = await api.parseWebsites("chocolate", "radius=100&la=34.0689&lo=-118.4452", "Walmart", "price");

    console.log("Test case 2: Sorted");
    if(data[0]["items"].length != 0 || data[1]["items"].length != 1 || 
       data[2]["items"].length != 0 || data[3]["items"].length != 0 || 
       data[1]["items"][0]["itemData"][0]["price"] > data[1]["items"][0]["itemData"][1]["price"]) {
        throw 'Test Case 1.2 Failed!'
    }
    console.log("Test Case 1.2 Passed!");
    console.log("Test Case Group 1 Passed!");

    /** Test Case Group 2 */
    data = await api.parseWebsites("chocolate&marshmallows", "radius=2000&la=34.0689&lo=-118.4452", "Food4Less", "none");

    console.log("Test case Group 2 (Multiple items, single store):");
    console.log("Test case 2.1 Unsorted");
    if(data[0]["items"].length != 0 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 0 || data[3]["items"].length != 2) {
        throw 'Test Case 2.1 Failed!'
    }
    console.log("Test Case 2.1 Passed!");

    data = await api.parseWebsites("chocolate&marshmallows", "radius=2000&la=34.0689&lo=-118.4452", "Food4Less", "price");

    console.log("Test case 2: Sorted");
    if(data[0]["items"].length != 0 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 0 || data[3]["items"].length != 2 || 
       data[3]["items"][0]["itemData"][0]["price"] > data[3]["items"][0]["itemData"][1]["price"] ||
       data[3]["items"][1]["itemData"][0]["price"] > data[3]["items"][1]["itemData"][1]["price"]) {
        throw 'Test Case 2.2 Failed!'
    }
    console.log("Test Case 2.2 Passed!");
    console.log("Test Case Group 2 Passed!");

    /** Test Case Group 3 */
    data = await api.parseWebsites("chocolate", "radius=2000&la=34.0689&lo=-118.4452", "Ralphs&Costco", "none");

    console.log("Test case Group 3 (Single item, multiple stores):");
    console.log("Test case 3.1 Unsorted");
    if(data[0]["items"].length != 1 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 1 || data[3]["items"].length != 0) {
        throw 'Test Case 3.1 Failed!'
    }
    console.log("Test Case 3.1 Passed!");

    data = await api.parseWebsites("chocolate", "radius=100&la=34.0689&lo=-118.4452", "Ralphs&Costco", "price");

    console.log("Test case 3: Sorted");
    if(data[0]["items"].length != 1 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 1 || data[3]["items"].length != 0 || 
       data[0]["items"][0]["itemData"][0]["price"] > data[0]["items"][0]["itemData"][1]["price"] ||
       data[2]["items"][0]["itemData"][0]["price"] > data[2]["items"][0]["itemData"][1]["price"]) {
        throw 'Test Case 3.2 Failed!'
    }
    console.log("Test Case 3.2 Passed!");
    console.log("Test Case Group 3 Passed!");

    /** Test Case Group 4 */
    data = await api.parseWebsites("chocolate&chicken", "radius=2000&la=34.0689&lo=-118.4452", "Ralphs&Costco", "none");

    console.log("Test case Group 4 (Multiple items, multiple stores):");
    console.log("Test case 4.1 Unsorted");
    if(data[0]["items"].length != 2 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 2 || data[3]["items"].length != 0) {
        throw 'Test Case 4.1 Failed!'
    }
    console.log("Test Case 4.1 Passed!");

    data = await api.parseWebsites("chocolate&chicken", "radius=100&la=34.0689&lo=-118.4452", "Ralphs&Costco", "price");

    console.log("Test case 4: Sorted");
    if(data[0]["items"].length != 2 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 2 || data[3]["items"].length != 0 || 
       data[0]["items"][0]["itemData"][0]["price"] > data[0]["items"][0]["itemData"][1]["price"] ||
       data[2]["items"][0]["itemData"][0]["price"] > data[2]["items"][0]["itemData"][1]["price"] || 
       data[0]["items"][1]["itemData"][0]["price"] > data[0]["items"][1]["itemData"][1]["price"] ||
       data[2]["items"][1]["itemData"][0]["price"] > data[2]["items"][1]["itemData"][1]["price"]) {
        throw 'Test Case 4.2 Failed!'
    }

    console.log("Test Case 4.2 Passed!");
    console.log("Test Case Group 4 Passed!");
}

(async () => { 
    await main();
    process.exit(0);
})()