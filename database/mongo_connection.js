const mongoose = require('mongoose');
const config = require('config');

const mongoConnect = async () => {
    try {
        await mongoose.connect(config.get('database.mongodb'), { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected!')
    } catch (error) {
        throw new Error(error);
    }

}

module.exports = mongoConnect;


// module.export = () => {
//     mongoose.connect(config.get('database.mongodb'), { useNewUrlParser: true });
//     mongoose.connection.on('connected', function () {

//         console.log(connected("Mongoose default connection is open to ", config.get('database.mongodb')));
//         /*** Error ***/
//         app.use((req, res, next) => {
//             const error = new Error('Not found.');
//             error.status = 404;
//             next(error);
//         });

//         app.use((error, req, res, next) => {
//             let statusCodes = error.status || 500;
//             let response = {
//                 success: false,
//                 message: error.message
//             };
//             // if (config.get('app.debug')) response.stack = error.stack;
//             res.status(statusCodes).json(
//                 response
//             );
//         });


//         process.on('unhandledRejection', function (reason, p) {
//             console.log(reason);
//         });

//         app.listen(process.env.PORT || 4000, () => {
//             console.log("Node server started", process.env.PORT || 4000);
//         });

//     });
//     mongoose.connection.on('error', function (err) {
//         console.log(error("Mongoose default connection has occured " + err + " error"));
//     });
//     mongoose.connection.on('disconnected', function () {
//         console.log(disconnected("Mongoose default connection is disconnected"));
//     });
//     process.on('SIGINT', function () {
//         mongoose.connection.close(function () {
//             console.log("Mongoose default connection is disconnected due to application termination");
//             process.exit(0);
//         });
//     });

// }