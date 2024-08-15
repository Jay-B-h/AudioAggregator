# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Front-end Layout
This project has a front end and a backend component. The front end uses the React javascript framework.
The App page contains the Routing logic that sends users to different pages depending on the route they are on.

To add a page to the app, create the component for the page in the [src/pages](src/pages) directory, then add it to the [App.js routes](src/App.js).

All functions in the front end that are going to interact with the backend should be placed in the [SQLUtils.js](src/SQLUtils.js) file and exported. These functions can be imported to the component you need to call it from

## Backend Layout
The backend of this project uses Express.js to run a node.js based web server. Code for the back end of the project is stored in the [index.js](server/index.js) file in the server directory. 
The general layout of a mapping for the backend is as follows:
```javascript
//app.get for get mappings, app.post for post mappings, you get the idea
app.get('/pathname',async (req,res) => {
    /**
     * method body here
     */
})
```
there is already a database connection defined in the [database.js](server/database.js) file. This has been imported into the index.js file, and you can query the database with the connection.query command.
```javascript
connection.query(`QUERY BODY HERE')`,
    function (error, results, fields) {
        // send a 400 response if we get an error
        if (error)
            res.status(400).send(error)
        // an autoincrement id can be accessed via the insertId property of the query result of an insert call
        id = results.insertId
        // you can also nest secondary queries within the handler of another query, 
        // you should do this when you need information from the first query for the second
        connection.query(`NESTED QUERY HERE`,
            function (error, results, fields) {
                if (error)
                    res.status(400).send(error)
                res.status(200).json(id)
            })

    })
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run server`

Runs the backend with nodemon so it will recompile upon a save.

### `npm run all`
runs both the start and server commands in parallel

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
