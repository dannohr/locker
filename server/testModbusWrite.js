// create an empty modbus client
var ModbusRTU = require("modbus-serial");
var client = new ModbusRTU();

// open connection modbus device
client
  .connectTCP("10.0.0.10", { port: 502 })
  .then(setClient)
  .then(function() {
    console.log("Connected");
  })
  .catch(function(e) {
    console.log(e.message);
  });

function setClient() {
  // set the client's unit id
  // set a timout for requests default is null (no timeout)
  client.setID(1);
  client.setTimeout(500);

  openDoor();
}

function openDoor() {
  num = 8;
  clearAllOutputs()
    .then(function() {
      return turnOn(num);
    })
    .then(function() {
      return turnOff(num);
    })
    .then(function() {
      return checkInputs(num);
    })
    .then(function() {
      return close();
    })
    .catch(function(e) {
      console.log(e.message);
    });
}

var turnOn = function(num) {
  var promise = new Promise(function(resolve, reject) {
    client.writeCoil(num, true).then(function(result) {
      console.log("Send Signal to Open Door", result);
      resolve(result.address);
    });
  });
  return promise;
};

var turnOff = function(num) {
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      client.writeCoil(num, false).then(function(result) {
        console.log("Send Signal to Open Door", result);
        resolve(result);
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