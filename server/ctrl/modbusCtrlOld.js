// _____  API ______ //
const modbusClient = require("../modbusClient.js");
const numCards = 3;
let lockAction = {
  error: false,
  locksToOpen: null,
  lockAction: null,
  lockOpenStatus: []
};

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

  postOpenLock: (req, res, next) => {
    let lockNumber = req.body.locks[0];

    modbusClient.client.connect().on("error", function(err) {
      //Show error as API response
      res.json(err);
    });

    modbusClient.client.writeSingleCoil(lockNumber, false).then(function(resp) {
      console.log(resp);
      modbusClient.client.close();
      res.json(resp);
    }, console.error);

    modbusClient.client.connect();

    // modbusClient.client.close();
    // console.log('Headers Start')
    // console.log(res.headers)
    // console.log('Headers End')
    // console.log('Locks to Open Are:')
    // console.log(req.body.locks)
    // // lockNumber = null;
    // lockAction = {
    //   error: false,
    //   locksToOpen: null,
    //   lockOpen: null,
    //   lockAction: null,
    //   lockOpenStatus: []
    // };

    // lockAction.lockOpen = JSON.parse(req.body.action);

    // let lockNumber = req.body.locks[0];
    // let didDoorOpen = false;
    // let doorCounter = 0;

    // modbusClient.client
    //   // .connect()
    //   .on("error", function(err) {
    //     //Show error as API response
    //     res.json(err);
    //   })

    //   modbusClient.client
    //   .on("connect", function() {
    //     console.log("Opening Lock Number: ", req.body.locks[0]+1);

    //     // modbusClient.client
    //       modbusClient.client.writeSingleCoil(req.body.locks[0], lockAction.lockOpen)
    //       .then(function(resp) {
    //         console.log("Tried to open door", req.body.locks[0], resp);
    //         // modbusClient.client
    //         //   .readDiscreteInputs(0, numInputs)
    //         //   .then(function(resp) {
    //         //     console.log("Lock", lockNumber, "open?", resp.coils[lockNumber])
    //         //       // .then(function(resp) {
    //         //       //   res.json(lockAction);
    //         //       //   modbusClient.client.close();
    //         //       // });

    //         //     modbusClient.client.close();
    //         //   });
    //       }, console.error)

    //       .finally(function() {
    //           console.log("Connection Closed");
    //           modbusClient.client.close();
    //           res.json(lockAction);
    //       });
    //   });

    //   modbusClient.client.connect()
  }
};
