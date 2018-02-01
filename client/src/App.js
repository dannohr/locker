import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";

import "./App.css";

import Pickup from "./components/Pickup";
import DropOff from "./components/DropOff";
import Keyboard from "./components/Keyboard";
import WalkupScreen from "./components/WalkupScreen";
import ManuallyOpenDoors from "./components/ManuallyOpenDoors";

import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App Site">
        <div className="Site-content">
          <div className="App-header">
            <Header />
          </div>

          <BrowserRouter>
            <Switch>
              <Route path="/pickup" component={Pickup} />
              <Route path="/dropoff" component={DropOff} />
              <Route path="/manualdooropen" component={ManuallyOpenDoors} />
              <Route exact path="/" component={WalkupScreen} />
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
