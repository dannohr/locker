// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

//
var actionLog = {
  lockNum: 8,
  connect: true,
  clearAll: true,
  onResult: { num: 8, status: true },
  offResult: { num: 8, status: false }
};

module.exports = {
  getAllInputStatus: (req, res, next) => {},

  postOpenLock: (req, res, next) => {
    console.log("--- Start of Lock Open Sequence ---");

    openDoor(req.body.lock[0]).then(response => {
      console.log(response);
      //res.status(201).json("hi");
    });
  }
};

function openDoor(num) {
  console.log("Opening Door Number", num);

  var promise = new Promise(function(resolve, reject) {
    connect()
      .then(function() {
        return clearAllOutputs();
      })
      .then(function() {
        return turnOn(num);
      })
      .then(function() {
        return turnOff(num);
      })
      .then(function() {
        console.log("The end:", actionLog); //no bueno
        return checkInputs(num);
      })
      .catch(function(e) {
        console.log(e.message);
      });
  });
  return promise;
}

//Connect to the Modbus Device
var connect = function() {
  var promise = new Promise(function(resolve, reject) {
    // not sure why this is necessary, but seems to be, I think the close
    // connection isn't working right and unless I set this to null it thinks
    //it's still connected.
    client.isOpen = null;

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
  });
  return promise;
};

function setClient() {
  // set the client's unit id
  // set a timout for requests default is null (no timeout)
  // Taken from modbus-serial documentation
  client.setID(1);
  client.setTimeout(100);
}

var turnOn = function(num) {
  var promise = new Promise(function(resolve, reject) {
    client.writeCoil(num, true).then(function(result) {
      console.log("Send Signal to Open Door", result);
      // Results above shows on the console, but the resolve() doesn't work right
      resolve(result.address);
    });
  });
  return promise;
};

var turnOff = function(num) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      client.writeCoil(num, false).then(function(result) {
        console.log("Stop Lock Open Signal", result);
        resolve(result);
      });
    }, 50);
  });
  return promise;
};

// This returns the status of all inputs in an array.  Door open will be true
// Results something like [false, false, false, true, false] to inducate door 4 is open.
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

// Not sure if this is needed long term, but in case any outputs are left on
// turn them all off prior to starting a new door open routine.
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

// closes connection to modbus device.  Not sure if this is necessary.
function close() {
  client.close();
  console.log("Connection Closed");
}
