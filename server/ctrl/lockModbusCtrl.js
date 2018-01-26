const modbus = require("../modbusClient.js");

module.exports = {
  getAllInputStatus: (req, res, next) => {
    modbus.doorOpenStatus().then(response => {
      console.log("---------- Start of Lock Open Sequence ----------");
      console.log(response);
      console.log("----------- End of Lock Open Sequence -----------");
      res.status(200).json(response);
    });
  },

  postOpenLock: (req, res, next) => {
    modbus.openDoorTwice(req.body.lock[0]).then(response => {
      console.log("---------- Start of Check Door Sequence ----------");
      console.log(response);
      console.log("----------- End of Check Door Sequence -----------");
      res.status(201).json(response);
    });
  },

  postOpenLocks: (req, res, next) => {
    let status = [];
    req.body.lock.forEach(function(num, index) {
      setTimeout(function() {
        console.log("Lock Number", num);
        modbus.openDoor(num).then(response => {
          console.log("for lock number", index);
          status.push(response);
          console.log(status);
          res.status(201).json(status);
        });
      }, index * 3000);
    });
  },

  postOpenLockMultipleTimes: (req, res, next) => {
    let attempts = 1;
    modbus.openDoor(req.body.lock[0]).then(response => {
      if (response.doorOpen[req.body.lock[0]]) {
        response.attempts = attempts;
        res.status(201).json(response);
      } else {
        setTimeout(function() {
          attempts++;
          modbus.openDoor(req.body.lock[0]).then(response => {
            response.attempts = attempts;
            res.status(201).json(response);
          });
        }, 3000);
      }
    });
  }
};
