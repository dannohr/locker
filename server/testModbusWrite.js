/* eslint-disable no-console, spaced-comment */

// create an empty modbus client
var ModbusRTU = require("modbus-serial")
var client = new ModbusRTU();

// open connection modbus device
client.connectTCP("10.0.0.10", { port: 502 })
    .then(setClient)
    .then(function() {
        console.log("Connected"); })
    .catch(function(e) {
        console.log(e.message); });

function setClient() {
  // set the client's unit id
  // set a timout for requests default is null (no timeout)
    client.setID(1);
    client.setTimeout(2000);

  // run program
    run();
}


function delay(t, v) {
    return new Promise(function(resolve) { 
        setTimeout(resolve.bind(null, v), t)
    });
 }

function run() {

    // Send Signal to Open Door
    client.writeCoil(0, true)
        .then(function(respOpen) {
            console.log("Send Signal to Open Door", respOpen); 
        })
            
            // after 1 second delay, turn signal off
            delay(1000).then(function() {
                client.writeCoil(0, false)
                    .then(function(respClose) {
                    console.log("Stop Open Door Signal", respClose); })
            })
        
        
        .catch(function(e) {
            console.log(e.message); })
    
    
}

function close() {
    client.close();
    console.log('Connection Closed')
}

function readInputs() {
    client.readCoils(0, 23)
        .then(function(d) {
            console.log(d)
            console.log("Receive Coils:", d.data); })
}