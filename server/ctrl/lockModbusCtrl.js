// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

var actionLog = {
  lockNum: null,
  onState: "",
  offState: ""
};

module.exports = {
  getAllInputStatus: (req, res, next) => {},

  postOpenLock: (req, res, next) => {
    console.log("--- Start of Lock Open Sequence ---");
    actionLog = {
      lockNum: req.body.lock,
      onState: "",
      offState: ""
    };

    openDoor(actionLog).then(response => {
      console.log(response);
      //res.status(201).json("hi");
    });
  }
};

function openDoor(actionLog) {
  console.log("Opening Door Number", actionLog.lockNum);

  var promise = new Promise(function(resolve, reject) {
    connect()
      .then(function() {
        return clearAllOutputs();
      })
      .then(function() {
        return turnOn(actionLog);
      })
      .then(function() {
        return turnOff(actionLog);
      })
      .then(function() {
        console.log("The end:", actionLog);
        return checkInputs(actionLog);
      })
      .catch(function(e) {
        console.log(e.message);
      });
  });
  return promise;
}

var connect = function() {
  var promise = new Promise(function(resolve, reject) {
    client.isOpen = null; //not sure why this is necessary, but seems to be
    client
      .connectTCP("10.0.0.10", { port: 502 })
      .then(setClient)
      .then(function() {
        resolve(true);
      })
      .catch(function(e) {
        console.log(e.message);
        resolve(e);
      });
    // }
  });
  return promise;
};

function setClient() {
  // set the client's unit id
  // set a timout for requests default is null (no timeout)
  client.setID(1);
  client.setTimeout(100);
}

var turnOn = function(actionLog) {
  var promise = new Promise(function(resolve, reject) {
    client.writeCoil(actionLog.lockNum, true).then(function(result) {
      console.log("Send Signal to Open Door", result);
      // resolve(result.address);
      resolve({
        lockNum: actionLog.lockNum,
        onState: result,
        offState: ""
      });
    });
  });
  return promise;
};

var turnOff = function(actionLog) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      client.writeCoil(actionLog.lockNum, false).then(function(result) {
        console.log("Stop Lock Open Signal", result);
        resolve({
          lockNum: actionLog.lockNum,

          offState: result
        });
      });
    }, 50);
  });
  return promise;
};

var checkInputs = function(num) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      client.readDiscreteInputs(0, 23).then(function(result) {
        console.log("Door Open:", result.data[num]);
        resolve(result);
      });
    }, 500);
  });
  return promise;
};

function close() {
  client.close();
  console.log("Connection Closed");
}

var clearAllOutputs = function() {
  var promise = new Promise(function(resolve, reject) {
    client
      .writeCoils(0, [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ])
      .then(function(result) {
        console.log("Cleared Outputs:", result);
        resolve(result);
      });
  });
  return promise;
};
