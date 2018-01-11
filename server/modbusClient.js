const modbus = require("jsmodbus");
const host = "10.2.5.35";
const port = 502;
const numCards = 3;

let numInputs = 8 * numCards - 1;

module.exports = {
  // create a modbus client
  client: modbus.client.tcp.complete({
    host: host,
    port: port,
    autoReconnect: true,
    reconnectTimeout: 1000,
    timeout: 5000,
    unitId: 0
  })
};

// // create a modbus client
// var client = modbus.client.tcp.complete({
//     host: host,
//     port: port,
//     autoReconnect: true,
//     reconnectTimeout: 1000,
//     timeout: 5000,
//     unitId: 0
// });

// client.connect();

// client.on("connect", function () {
//     client
//         .readDiscreteInputs(0, numInputs)
//         .then(function (resp) {
//             console.log(resp);
//             for (i = 0; i < resp.coils.length; i++) {
//                 console.log('Input ', i + 1, ' is ', resp.coils[i])
//             }
//         }, console.error)
//         .finally(function () {
//             client.close();
//         });
// });

// let i = 0;

// for (i; i < 8; i++) {
//     client.writeSingleCoil(i, false).then(function (resp) {
//         // resp will look like { fc: 5, byteCount: 4, outputAddress: 5, outputValue: true }
//         console.log(resp);
//     }, console.error);
// }

// // i = 0;

// // for (i; i < 8; i++) {
// //   client.writeSingleCoil(i, false).then(function(resp) {
// //     // resp will look like { fc: 5, byteCount: 4, outputAddress: 5, outputValue: true }
// //     //console.log(resp);
// //   }, console.error);
// // }

// let num = 0;
// // function openLock(num) {
// console.log("Opening Locker Number ", num + 1);
// client.writeSingleCoil(num, true).then(function (resp) {
//     // resp will look like { fc: 5, byteCount: 4, outputAddress: 5, outputValue: true }
//     console.log(resp);
//     console.log("done");
// }, console.error);
