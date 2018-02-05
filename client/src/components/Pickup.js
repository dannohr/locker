import React, { Component } from "react";

import { withRouter } from "react-router-dom";

class Pickup extends Component {
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

  render() {
    return (
      <div>
        <div>Pick Up Package </div>
        <div />
      </div>
    );
  }
}

export default withRouter(Pickup);
