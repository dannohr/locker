import React from "react";
// import ReactDom from "react-dom";
// import KeyboardedInput from "./KeyboardedInput";
import KeyboardedInput from "react-touch-screen-keyboard";

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "test123",
      customMapping: [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l", "@"],
        ["z", "x", "c", "v", "b", "n", "m", "."]
      ]
    };
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(val) {
    this.setState({ value: val });
  }

  render() {
    return (
      <div>
        <KeyboardedInput
          value={this.state.value}
          onChange={value => {
            this.handleValueChange(value);
          }}
          opacity={0.8}
          placeholder={"testme"}
          enabled
        />
      </div>
    );
  }
}
