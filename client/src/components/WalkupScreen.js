import React from "react";
import { withRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
const style = {
  margin: 12
};

class WalkupScreen extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <RaisedButton
            label="Drop Off Package"
            style={style}
            onClick={() => this.nextPath("/dropoff")}
          />
          <RaisedButton
            label="Retrieve Package"
            style={style}
            onClick={() => this.nextPath("/pickup")}
          />
          <RaisedButton
            label="Manually Open Doors"
            style={style}
            onClick={() => this.nextPath("/manualdooropen")}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(WalkupScreen);
