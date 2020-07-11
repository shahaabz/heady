const express = require('express');
const config = require('config');

const er = require('./error');
const mongoConnect = require('./database/mongo_connection');


const app = express();


app.get('/', (req, res) => {
    er.eee();
    res.send('dwd');
});

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
    if (config.get('app.debug')) response.stack = error.stack;
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