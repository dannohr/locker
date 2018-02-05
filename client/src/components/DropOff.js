import React from "react";
import { withRouter } from "react-router-dom";
// import Input from "./Input";
import KeyboardedInput from "react-touch-screen-keyboard";
import "react-touch-screen-keyboard/lib/Keyboard.css";

class DropOff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuff: "A bunch of text.",
      customMapping: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "@"],
        ["z", "x", "c", "v", "b", "n", "m", ".", "!"]
      ]
    };
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  handleValueChange(val) {
    this.setState({ stuff: val });
    console.log(this.state.stuff);
  }

  render() {
    return (
      <div>
        <div>Drop Off Off </div>

        <div>
          <KeyboardedInput
            value={this.state.stuff}
            onChange={val => {
              this.handleValueChange(val);
            }}
            opacity={0.8}
            placeholder={"testme"}
            // defaultKeyboard={this.state.customMapping}
            enabled
          />
        </div>
      </div>
    );
  }
}

export default withRouter(DropOff);
