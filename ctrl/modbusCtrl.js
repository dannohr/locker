// _____  API ______ //
const modbusClient = require("../client.js");
const numCards = 3;

let numInputs = 8 * numCards - 1;

module.exports = {
    getAllInputStatus: (req, res, next) => {
        console.log("getting status of all inputs");
        modbusClient.client.connect()
            .readDiscreteInputs(0, numInputs)
            .then(function (resp) {
                res.json({
                    error: false,
                    inputs: resp.coils
                });
            }, console.error)
            .finally(function () {
                modbusClient.client.close();
                console.log('Connection Closed')
            });

    },
    getOneInputStatus: (req, res, next) => {
        console.log("getting status of one input");
        modbusClient.client.connect()
            .readDiscreteInputs(0, 9)
            .then(function (resp) {
                res.json({
                    error: false,
                    inputs: resp.coils
                });
            }, console.error)
            .finally(function () {
                modbusClient.client.close();
                console.log('Connection Closed')
            });
    }


}