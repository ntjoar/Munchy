# Munchy
For this project, you will need to run two seperate servers. One is for our webscraping API and one for our frontend server. Frontend should be run on port 3000 and backend on port 8000. For this, the frontend takes basic inputs and sends it to our api so our API can return values to front end. 

# General
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Check out our [Wiki](https://github.com/ntjoar/Munchy/wiki) for more

## About
Munchy is a team of CS130 Students here at UCLA. We understand the struggle of students trying to execute recipes but not knowing where to go for ingredients. We are hoping to create a solution in which students can set how far they are willing to travel for cheap ingredients near them. As such, we are hoping to give those students trying to take more interest in culinary arts, the choice to do so.

Our hope with this website is to help promote more interest in the culinary arts using recipes. We want you to be able to cook and execute a recipe without the hassle of having to find where to find the cheapest available choice for each ingredient. This is a website made by students for students.

This website is our final project for CS130 and not officially published

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

# File Hierarchy
This should be updated as we update our code design.

```
.
|
|-- Back_End
|   |-- config (Which markets can we scrape)
|   |   |-- ...
|   |
|   |-- Market (Market Scraping Tool)
|   |   |-- ...
|   |
|   |-- model
|   |   |-- Item.js (Our item object)
|   |   |-- Market.js (Our market object)
|   |
|   |-- api.js (Our main api javascript server)
|   |
|   |-- ...
|
|-- Front_End
|   |-- public (Folder of all public assets)
|   |   |-- ...
|   |
|   |-- src ()
|   |   |-- fonts (Installed fonts needed for frontend)
|   |   |-- images (images used on frontend)
|   |   |-- App.js (Our main React.js script)
|   |   |-- Components (React components)
|   |   |-- CSS (Component stylesheets)
|
|-- README
```

# The Development Team
### Ashwin Ranade 
_Major:_ Computer Science

_GitHub:_ https://github.com/ashwin-s-ranade

### Karim Ben
_Major:_ Computer Science 

_GitHub:_ https://github.com/ben-karim2014

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
