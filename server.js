//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const modbus = require("jsmodbus");


const app = express();

require("dotenv").load();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
    );
    next();
});


const modbusClient = require("./client.js");

// For modbus connection
// const host = "192.168.2.82";
// const port = 502;
const numCards = 3;

let numInputs = 8 * numCards - 1;


// create a modbus client
// var client = modbus.client.tcp.complete({
//     host: host,
//     port: port,
//     autoReconnect: true,
//     reconnectTimeout: 1000,
//     timeout: 5000,
//     unitId: 0
// });

// modbusClient.client.connect();



// modbusClient.client.on("connect", function () {

//     console.log('Connected')
//     modbusClient.client
//         .readDiscreteInputs(0, numInputs)
//         .then(function (resp) {
//             console.log(resp.coils);
//         }, console.error)
//         .finally(function () {
//             modbusClient.client.close();
//             console.log('Connection Closed')
//         });
// });




const modbusCtrl = require("./ctrl/modbusCtrl.js");

app.get("/api/getAllInputStatus", modbusCtrl.getAllInputStatus);
app.post("/api/postOpenLock", modbusCtrl.postOpenLock);




//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});