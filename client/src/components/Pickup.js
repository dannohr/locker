import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Pickup extends Component {
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
