import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";

import "./App.css";

import MyComponent from "./components/Mycomponent";
import Keyboard from "./components/Keyboard";
import WalkupScreen from "./components/WalkupScreen";

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
              <Route exact path="/" component={WalkupScreen} />
              <Route path="/test1" component={MyComponent} />
              <Route path="/test2" component={Keyboard} />
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
