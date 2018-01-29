const modbus = require("../modbusClient.js");

module.exports = {
  getAllInputStatus: (req, res, next) => {
    console.log("---------- Start of Lock Open Sequence ----------");
    modbus.doorOpenStatus().then(response => {
      console.log(response);
      console.log("----------- End of Lock Open Sequence -----------");
      res.status(200).json(response);
    });
  },

  postOpenLock: (req, res, next) => {
    modbus
      .openDoors(req.body.lock, req.body.attempts)
      .then(response => {
        console.log("---------- Start of Check Door Sequence ----------");
        console.log(response);
        console.log("----------- End of Check Door Sequence -----------");
        res.status(201).json(response);
      })
      .catch(response => {
        res.status(400);
      });
  }
};
