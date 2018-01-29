import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { connect } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "./App.css";
import logo from "./logo.svg";

import MyComponent from "./components/Mycomponent";
import Keyboard from "./components/Keyboard";
import WalkupScreen from "./components/WalkupScreen";

class App extends Component {
  state = {
    response: ""
  };

  componentDidMount() {
    this.isLockerSystemConnected()
      .then(res =>
        this.setState({
          response: "Connected to locker system:  " + res[0].connect.toString()
        })
      )
      .catch(err => console.log(err));
  }

  isLockerSystemConnected = async () => {
    const response = await fetch("/api/getAllInputStatus");
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the system</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
        <MuiThemeProvider>
          <WalkupScreen />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
