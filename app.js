const express = require('express');
const config = require('config');
const bodyParser = require("body-parser");

const mongoConnect = require('./database/mongo_connection');
const routes = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);


/*** Error ***/
app.use((req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    let statusCodes = error.status || 500;
    let response = {
        success: false,
        message: error.message
    };
    if (config.get('app_debug')) response.stack = error.stack;
    res.status(statusCodes).json(response);
});


process.on('unhandledRejection', function (reason, p) {
    console.log(reason);
});

mongoConnect().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log("Node server started", process.env.PORT || 4000);
    });
}).catch((error) => {
    console.log(error)
});