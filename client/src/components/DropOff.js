import React from "react";
import { withRouter } from "react-router-dom";
import Input from "./Input";
import "react-touch-screen-keyboard/lib/Keyboard.css";

class DropOff extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <div>Drop Off Off </div>
        <div />
        <Input />
      </div>
    );
  }
}

export default withRouter(DropOff);
