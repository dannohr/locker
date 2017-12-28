//Initiallising node modules
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const passport = require("passport");
const dotenv = require("dotenv");
const session = require("express-session");

const app = express();

require("dotenv").load();

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
    );
    next();
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);

//require("./passport")(passport);

// setting up passport
app.use(passport.initialize());
app.use(passport.session());

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// const apiCtrl = require("./ctrl/apiCtrl.js");
// const partyCtrl = require("./ctrl/partyCtrl.js");
// const userCtrl = require("./ctrl/userCtrl.js");
// const itemCtrl = require("./ctrl/itemCtrl.js");

// app.get("/api/workorder", apiCtrl.getWorkOrders);
// app.get("/api/test", apiCtrl.getUsers);
// app.get("/api/party", partyCtrl.getParty);
// app.post("/api/login", userCtrl.postUser);
// app.get("/api/syncItems", itemCtrl.getSyncItems);
// app.get("/api/mieSync/party", partyCtrl.getMiePartyToSync);

// // Authentication
// app.post("/auth/login", passport.authenticate("local"), (req, res) => {
//   //{ successRedirect: '/' }
//   console.log("res status", res.status);
//   console.log(req.user);
//   res.status(200).json(req.user);
// });