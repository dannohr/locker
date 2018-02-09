import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import Pickup from "./components/Pickup";
import DropOff from "./components/DropOff";
import WalkupScreen from "./components/WalkupScreen";
import ManuallyOpenDoors from "./components/ManuallyOpenDoors";
import ModbusServerSetup from "./components/ModbusServerSetup";
import Setup from "./components/Setup";
import Header from "./components/Header";
import Footer from "./components/Footer";

class App extends Component {
  state = {
    connected: ""
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App Site">
          <div className="Site-content">
            <div className="App-header">
              <Header />
            </div>
            <Switch>
              <Route path="/pickup" component={Pickup} />
              <Route path="/dropoff" component={DropOff} />
              <Route path="/manualdooropen" component={ManuallyOpenDoors} />
              <Route path="/modbussetup" component={ModbusServerSetup} />
              <Route path="/setup" component={Setup} />
              <Route exact path="/" component={WalkupScreen} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
