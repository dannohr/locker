import React from "react";
import { withRouter } from "react-router-dom";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import RaisedButton from "material-ui/RaisedButton";
// const style = {
//   margin: 12
// };

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
