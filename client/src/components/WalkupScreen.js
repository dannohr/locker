import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
const style = {
  margin: 12
};

const WalkupScreen = () => (
  <div>
    <MuiThemeProvider>
      <RaisedButton label="Drop Off Package" style={style} />
      <RaisedButton label="Retrieve Package" style={style} />
    </MuiThemeProvider>
  </div>
);

export default WalkupScreen;
