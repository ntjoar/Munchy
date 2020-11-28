const api = require('./api.js');

async function main() {
    /** Test Case 1 */
    let data = await api.parseWebsites("chocolate", "radius=2000&la=34.0689&lo=-118.4452");

    console.log("Test case 1: Add Distance Limitations");
    if(data[0]["items"].length != 0 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 1 || data[3]["items"].length != 0) {
        throw 'Test Case 1 Failed!'
    }
    console.log("Test Case 1 Passed!");

    /** Test Case 2 */
    data = await api.parseWebsites("brocolli&chicken", "radius=100&la=34.0689&lo=-118.4452");

    console.log("Test case 2: Multiple items");
    if(data[0]["items"].length != 0 || data[1]["items"].length != 0 || 
       data[2]["items"].length != 0 || data[3]["items"].length != 0) {
        throw 'Test Case 2 Failed!'
    }
    console.log("Test Case 2 Passed!");

    /** Test Case 3 */
    data = await api.parseWebsites("chocolate&marshmallows", "radius=2000&la=default&lo=default");

    console.log("Test case 3: Default Distances");
    if(data[0]["items"].length != 2 || data[1]["items"].length != 2 || 
       data[2]["items"].length != 2 || data[3]["items"].length != 2) {
        throw 'Test Case 3 Failed!'
    }
    console.log("Test Case 3 Passed!");
}

(async () => { 
    await main();
    process.exit(0);
})()