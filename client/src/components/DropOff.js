import React from "react";
import { withRouter } from "react-router-dom";

class DropOff extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <div>Drop Off Off </div>
        <div />
      </div>
    );
  }
}

export default withRouter(DropOff);
