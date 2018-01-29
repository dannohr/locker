// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

module.exports = {
  openDoors: async (nums, attempts) => {
    let finalResults = [];
    for (const num of nums) {
      console.log(num);
      try {
        finalResults.push(
          await openDoor(num).then(function(result) {
            var promise = new Promise(function(resolve, reject) {
              let i = 0;
              // let finalResult = result;
              if (result.doorOpen[num] === true) {
                resolve(result);
              }
              let didDoorOpen = result.doorOpen[num];
              console.log("First DidDoorOpen", didDoorOpen);

              while (didDoorOpen === false && i < attempts) {
                i++;
                (function(j) {
                  setTimeout(function() {
                    console.log(j);
                    if (didDoorOpen === false) {
                      retryOpenDoor(num).then(function(result) {
                        didDoorOpen = result.doorOpen[num];
                        result.numOfTries = j;
                        if (result.doorOpen[num] === true || j === attempts) {
                          resolve(result);
                        }
                      });
                    }
                  }, 3000 * i);
                })(i);
              }
            });
            return promise;
          })
        );
      } catch (e) {
        console.log(e);
        return e;
      }
    }
    return finalResults;
  },
  doorOpenStatus: async () => {
    let finalResults = [];

    try {
      finalResults.push(
        await doorStatus().then(function(result) {
          console.log("Testing");
          console.log(result);
          return result;
        })
      );
    } catch (e) {
      console.log(e);
      return e;
    }

    return finalResults;
  }
};

function doorStatus() {
  var promise = new Promise(function(resolve, reject) {
    var response = {};
    connect()
      .then(function(result) {
        response.connect = result;
        console.log(response);
        return checkInputs();
      })
      .then(function(result) {
        //result is the value in the resolve function in checkInputs()
        response.doorOpen = result.data;
        console.log(response);
        resolve(response);
      })
      .catch(function(e) {
        console.log("here is the catch for doorOpenStatus function");
        console.log(e);
        reject(e);
      });
  });
  return promise;
}

function retryOpenDoor(num) {
  //when retrying, don't need to connect and clear outputs again
  console.log("Retrying Opening Door Number", num);

  var promise = new Promise(function(resolve, reject) {
    var response = { lockNum: num };
    turnOn(num)
      .then(function(result) {
        //result is the value in the resolve function in turnOn()
        response.onResult = result;
        console.log(response);
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
        console.log("catch from open door");
        console.log(e.message);
        reject(e);
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
      .catch(function(error) {
        let result = [];
        error.connect = "false";
        result.push(error);
        // console.log("catch from connect function:");
        // console.log(result);
        reject(result);
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
      client
        .readDiscreteInputs(0, process.env.NUM_CARDS * 8)
        .then(function(result) {
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
