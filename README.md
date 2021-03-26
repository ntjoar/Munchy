# Munchy
For this project, you will need to run two separate servers. One is for our webscraping API and one for our frontend server. Frontend should be run on port 3000 and backend on port 8000. For this, the frontend takes user inputs (ingredient names, store preferences) and sends it to our API which returns webscraped ingredient price data to the frontend. 

## About
Munchy is a team of CS130 students at UCLA. We understand the struggle of students trying to cook recipes but not knowing where to go for ingredients. We hope to create a solution in which students can easily find cheap ingredients near them. As such, we are hoping to give those students trying to take more interest in culinary arts the ability to do so. We want you to be able to cook and execute a recipe without the hassle of finding the cheapest available choice for each ingredient. This is a website made by students for students.

Users are able to provide recipe URLs to our app, which will webscrape the recipe website, find all the required ingredients, and add them to the current query. Users are also able to manually add items. Our webscraping API then parses the items included in the query from the frontend and searches various stores for these items, returning the items and their prices to the user. 

This website is our final project for CS130 and not officially published.

## Recipe Scraping - Supported Websites
- https://www.101cookbooks.com/
- https://www.allrecipes.com/
- https://www.ambitiouskitchen.com/
- https://www.averiecooks.com/
- https://www.bbc.co.uk/
- https://www.bbcgoodfood.com/
- https://www.bonappetit.com/
- https://www.budgetbytes.com/
- https://www.centraltexasfoodbank.org/
- https://www.closetcooking.com/
- https://cookieandkate.com/
- https://copykat.com/
- https://damndelicious.net/
- http://www.eatingwell.com/
- https://www.epicurious.com/
- https://www.food.com/
- https://www.foodandwine.com/
- https://www.foodnetwork.com/
- http://www.gimmesomeoven.com/
- https://www.kitchenstories.com/
- https://www.minimalistbaker.com/
- https://www.myrecipes.com/
- https://www.nomnompaleo.com/
- https://www.omnivorescookbook.com/
- https://pinchofyum.com/
- https://recipetineats.com/
- https://www.seriouseats.com/
- https://www.simplyrecipes.com/
- https://smittenkitchen.com/
- https://thepioneerwoman.com/
- https://tastesbetterfromscratch.com/
- https://therealfoodrds.com/
- https://www.thespruceeats.com/
- https://whatsgabycooking.com/
- https://www.woolworths.com.au/
- https://www.yummly.com/


Other websites can be added in the future.

# File Hierarchy
```
.
|
|-- Back_End
|   |-- config (Which markets can we scrape)
|   |   |-- AuthConfig.js
|   |   |-- DbConnection.js
|   |   |-- marketSettings.json
|   |
|   |-- coverage
|   |   |-- lcov-report
|   |   |-- clover.xml
|   |   |-- coverage-final.json
|   |   |-- lcov.info
|   |
|   |-- Market (Market Scraping Tool)
|   |   |-- Costco
|   |       |-- index.js
|   |   |-- Food4Less
|   |       |-- index.js
|   |   |-- Ralphs
|   |       |-- index.js
|   |   |-- Walmart
|   |       |-- index.js
|   |
|   |-- middleware
|   |   |-- Authorize.js
|   |
|   |-- model
|   |   |-- Item.js (Our item object)
|   |   |-- Items.js
|   |   |-- Market.js (Our market object)
|   |   |-- Recipe.js
|   |   |-- User.js
|   |   |-- User.test.js
|   |   |-- UserValidation.js
|   |
|   |-- routes
|   |   |-- Recipe.js
|   |   |-- Users.js
|   |
|   |-- api.js (Our main api javascript server)
|   |
|   |-- api.test.js
|
|
|-- Front_End
|   |-- public (Folder of all public assets)
|   |   |-- ...
|   |
|   |-- src (Frontend source files)
|   |   |-- actions
|   |   |   |-- authAction.js
|   |   |   |-- errorAction.js
|   |   |   |-- recipeAction.js
|   |   |   |-- types.js
|   |   |
|   |   |-- Components (React components)
|   |   |   |-- __snapshots__ (Jest snapshots)
|   |   |   |   |-- Footer.test.js.snap
|   |   |   |   |-- Popup.test.js.snap
|   |   |   |   |-- StorePrefPopup.test.js.snap
|   |   |   |
|   |   |   |-- AuthRoute.js
|   |   |   |-- Footer.js
|   |   |   |-- Footer.test.js
|   |   |   |-- Header.js
|   |   |   |-- Item.js
|   |   |   |-- Logout.js
|   |   |   |-- Popup.js
|   |   |   |-- Popup.test.js
|   |   |   |-- Slide.js
|   |   |   |-- StorePrefPopup.js
|   |   |   |-- StorePrefPopup.test.js
|   |   |
|   |   |-- CSS (Component stylesheets)
|   |   |   |-- Dashboard.css
|   |   |   |-- Footer.css
|   |   |   |-- Item.css
|   |   |   |-- NavbarHeader.css
|   |   |   |-- Popup.css
|   |   |   |-- PopupPrompt.css
|   |   |
|   |   |-- fonts (Installed fonts needed for frontend)
|   |   |-- images (images used on frontend)
|   |   |-- Pages
|   |   |   |-- __snapshots__ (Jest snapshots)
|   |   |   |  |-- HomePage.test.js.snap
|   |   |   |  |-- Login.test.js.snap
|   |   |   |  |-- signUp.test.js.snap
|   |   |   |
|   |   |   |-- Dashboard.js (Main dashboard)
|   |   |   |-- History.js
|   |   |   |-- HomePage.js (Home page)
|   |   |   |-- HomePage.test.js
|   |   |   |-- IndexPage.js
|   |   |   |-- LoggouttTestPage.js
|   |   |   |-- Login.js (Login page)
|   |   |   |-- Login.test.js
|   |   |   |-- Recipes.js
|   |   |   |-- signUp.js (Sign up page)
|   |   |   |-- signUp.test.js
|   |   |
|   |   |-- reducers
|   |   |-- App.css
|   |   |-- App.js (Our main React.js script)
|   |   |-- Index.js
|   |   |-- store.js
|   |
|   |-- package-lock.json
|   |-- package.json
|
|-- jtests (End to end login tests)
|   |-- auth.test.js
|   |-- jest-puppeteer.config.js
|   |-- jest.config.js
|   |-- package-lock.json
|   |-- package.json
|
|-- package-lock.json
|-- package.json
|-- README
```

# The Development Team
### Ashwin Ranade 
_Major:_ Computer Science

_GitHub:_ https://github.com/ashwin-s-ranade

### Karim Benlghalia 
_Major:_ Computer Science 

_GitHub:_ https://github.com/karim-benlghalia

### Jacob Lin
_Major:_ Computer Science 

_GitHub:_ https://github.com/articbear1999

### Nathan Tjoar
_Major:_ Computer Science and Engineering

_GitHub:_ https://github.com/ntjoar

### Nelson Chong
_Major:_ Computer Science

_GitHub:_ https://github.com/guangchun324

### Ryan Lam
_Major:_ Computer Science

_GitHub:_ https://github.com/ryanklam

# General
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Check out our [Wiki](https://github.com/ntjoar/Munchy/wiki) for more

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

