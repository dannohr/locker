import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from "material-ui/RaisedButton";

// const style = {
//   margin: 12
// };

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
