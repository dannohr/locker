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

  postOpenLock: (req, res, next) => {
    let lockAction = {
      error: false,
      locksToOpen: req.body.locks,
      lockOpenStatus: []
    };

    modbusClient.client
      .connect()
      .on("error", function(err) {
        //Show error as API response
        res.json(err);
      })
      .on("connect", function() {
        for (i = 0; i < req.body.locks.length; i++) {
          console.log("Opening Lock Number: ", req.body.locks[i]);

          let didDoorOpen = false;
          let doorCounter = 0;

          while (didDoorOpen === false && doorCounter < 3) {
            console.log("Door Counter ", doorCounter);
            modbusClient.client
              .writeSingleCoil(req.body.locks[i], false)
              .then(function(resp) {
                modbusClient.client
                  .readDiscreteInputs(0, numInputs)

                  .then(function(resp) {
                    console.log("door ", i, " is ", resp.coils[i]);
                  });
                // console.log(resp);
              }, console.error);
            doorCounter++;
          }
        }

        modbusClient.client
          .readDiscreteInputs(0, numInputs)
          .then(function(resp) {
            lockAction.lockOpenStatus = resp.coils;
            // Data returned:
            // res.json(lockAction);
          }, console.error)

          .finally(function() {
            // modbusClient.client.close();
            console.log("Connection Closed");
            res.json(lockAction);
            // modbusClient.client.close();
          });
      });
  }
};
