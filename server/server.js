const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

const lockModbusCtrl = require("./ctrl/lockModbusCtrl.js");
const lockerCtrl = require("./ctrl/lockerCtrl.js");
const databaseCtrl = require("./ctrl/databaseCtrl.js");

app.get("/api/getLockers", lockerCtrl.getAllLockers);

app.get("/api/getAllInputStatus", lockModbusCtrl.getAllInputStatus);
app.post("/api/postOpenLock", lockModbusCtrl.postOpenLock);

app.get("/api/modbus/getMusbusServer", databaseCtrl.getMusbusServer);
app.post("/api/modbus/postMusbusServer", databaseCtrl.postMusbusServer);

app.get("/api/hello", (req, res) => {
  res.send({ express: "Yep. Modbus System Connected" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
