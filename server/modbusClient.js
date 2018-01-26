// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

module.exports = {
  openDoorTwice: num => {
    //var try1 =
    openDoor(num).then(function(result) {
      console.log(result);
    });
    //console.log("here", try1);
    //return try1;
  },

  retryOpenDoor: num => {
    //when retrying, don't need to connect and clear outputs again
    console.log("Retrying Opening Door Number", num);

    var promise = new Promise(function(resolve, reject) {
      var response = { lockNum: num };
      turnOn(num)
        .then(function(result) {
          //result is the value in the resolve function in turnOn()
          response.onResult = result;
          //response = { lockNum: 3, connect: true, clearAll: { address: 0, length: 24 },  onResult: { address: 3, state: true } }
          return turnOff(num);
        })
        .then(function(result) {
          //result is the value in the resolve function in turnOff()
          response.offResult = result;
          return checkInputs();
        })
        .then(function(result) {
          //result is the value in the resolve function in checkInputs()
          response.doorOpen = result.data;
          resolve(response);
        })
        .catch(function(e) {
          console.log(e.message);
        });
    });
    return promise;
  },

  doorOpenStatus: () => {
    var promise = new Promise(function(resolve, reject) {
      var response = {};
      connect()
        .then(function(result) {
          response.connect = result;
          return checkInputs();
        })
        .then(function(result) {
          //result is the value in the resolve function in checkInputs()
          response.doorOpen = result.data;
          resolve(response);
        })
        .catch(function(e) {
          console.log(e.message);
        });
    });
    return promise;
  }
};

function openDoor(num) {
  console.log("Opening Door Number", num);
  var promise = new Promise(function(resolve, reject) {
    var response = { lockNum: num };
    connect()
      .then(function(result) {
        response.connect = result;
        return clearAllOutputs();
      })
      .then(function(result) {
        //result is the value in the resolve function in clearAllOutputs()
        response.clearAll = result;
        return turnOn(num);
      })
      .then(function(result) {
        //result is the value in the resolve function in turnOn()
        response.onResult = result;
        //response = { lockNum: 3, connect: true, clearAll: { address: 0, length: 24 },  onResult: { address: 3, state: true } }
        return turnOff(num);
      })
      .then(function(result) {
        //result is the value in the resolve function in turnOff()
        response.offResult = result;
        return checkInputs();
      })
      .then(function(result) {
        //result is the value in the resolve function in checkInputs()
        response.doorOpen = result.data;
        resolve(response);
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
      .connectTCP(process.env.MODBUS_IP, { port: process.env.MODBUS_PORT })
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
      resolve(result);
    });
  });
  return promise;
};

var turnOff = function(num) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      client.writeCoil(num, false).then(function(result) {
        resolve(result);
      });
    }, 50);
  });
  return promise;
};

// This returns the status of all inputs in an array.  Door open will be true
// Results something like [false, false, false, true, false] to indicate door 4 is open.
var checkInputs = function(num) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      client.readDiscreteInputs(0, 23).then(function(result) {
        resolve(result);
      });
    }, 500);
  });
  return promise;
};

// Not sure if this is needed long term, but in case any outputs are left on
// turn them all off prior to starting a new door open routine.
var clearAllOutputs = function() {
  //Build as array with a value of false for every output in the system
  let outputs = [];
  for (var i = 0; i < process.env.NUM_CARDS * 8; i++) {
    outputs.push(false);
  }
  var promise = new Promise(function(resolve, reject) {
    client.writeCoils(0, outputs).then(function(result) {
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
