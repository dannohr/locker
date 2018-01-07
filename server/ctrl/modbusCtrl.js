// _____  API ______ //
const modbusClient = require("../client.js");
const numCards = 3;

let numInputs = 8 * numCards - 1;

module.exports = {
  getAllInputStatus: (req, res, next) => {
    console.log("getting status of all inputs");
    modbusClient.client
      .connect()
      .readDiscreteInputs(0, numInputs)
      .then(function(resp) {
        res.json({
          error: false,
          inputs: resp.coils
        });
      }, console.error)
      .finally(function() {
        modbusClient.client.close();
        console.log("Connection Closed");
      });
  },

  postOpenLock: (req, res, next) => {}
  //   let lockAction = {
  //     error: false,
  //     locksToOpen: req.body.locks,
  //     lockAction: req.body.action,
  //     lockOpenStatus: []
  //   };

  //   var lockOpen = JSON.parse(req.body.action);

  //   modbusClient.client
  //     .connect()
  //     .on("error", function(err) {
  //       //Show error as API response
  //       res.json(err);
  //     })
  //     .on("connect", function() {
  //       console.log("Opening Lock Number: ", req.body.locks[0]);

  //       let lockNumber = req.body.locks[0];
  //       let didDoorOpen = false;
  //       let doorCounter = 0;

  //       modbusClient.client
  //         .writeSingleCoil(lockNumber, lockOpen)
  //         .then(function(resp) {
  //           console.log("Tried to open door", lockNumber, resp);
  //           modbusClient.client
  //             .readDiscreteInputs(0, numInputs)
  //             .then(function(resp) {
  //               console
  //                 .log("Lock", lockNumber, "open?", resp.coils[lockNumber])

  //                 .then(function(resp) {
  //                   res.json(lockAction);
  //                   modbusClient.client.close();
  //                 });

  //               //modbusClient.client.close();
  //             });
  //         }, console.error)

  //         .finally(function() {
  //           //   console.log("Connection Closed");
  //           // res.json(lockAction);
  //           // modbusClient.client.close();
  //         });
  //     });
  // }
};
