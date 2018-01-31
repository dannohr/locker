import React from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

let style = { margin: 20 };

function callApi() {
  console.log("hi");
}

class ManuallyOpenDoors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doorStatus: [],
      colors: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getAllInputStatus`).then(res => {
      let doorStatus = res.data[0].doorOpen;
      let colors = [];
      for (var i = 0; i < doorStatus.length; i++) {
        colors.push(doorStatus[i] ? "pink" : "green");
      }
      this.setState({ doorStatus, colors });
      console.log(this.state);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h1> Manually Open Lockers </h1>
          <div>
            <RaisedButton
              label="1"
              style={style}
              backgroundColor={this.state.colors[0]}
              onClick={() => callApi()}
            />
            <RaisedButton
              label="2"
              style={style}
              backgroundColor={this.state.colors[1]}
            />
            <RaisedButton
              label="3"
              style={style}
              backgroundColor={this.state.colors[2]}
            />
            <RaisedButton
              label="4"
              style={style}
              backgroundColor={this.state.colors[3]}
            />
            <RaisedButton
              label="5"
              style={style}
              backgroundColor={this.state.colors[4]}
            />
            <RaisedButton
              label="6"
              style={style}
              backgroundColor={this.state.colors[5]}
            />
            <RaisedButton
              label="7"
              style={style}
              backgroundColor={this.state.colors[6]}
            />
            <RaisedButton
              label="8"
              style={style}
              backgroundColor={this.state.colors[8]}
            />
          </div>
          <div>
            <RaisedButton label="9" style={style} />
            <RaisedButton label="10" style={style} />
            <RaisedButton label="11" style={style} />
            <RaisedButton label="12" style={style} />
            <RaisedButton label="13" style={style} />
            <RaisedButton label="14" style={style} />
            <RaisedButton label="15" style={style} />
            <RaisedButton label="16" style={style} />
          </div>
          <div>
            <RaisedButton label="17" style={style} />
            <RaisedButton label="18" style={style} />
            <RaisedButton label="19" style={style} />
            <RaisedButton label="20" style={style} />
            <RaisedButton label="21" style={style} />
            <RaisedButton label="22" style={style} />
            <RaisedButton label="23" style={style} />
            <RaisedButton label="24" style={style} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ManuallyOpenDoors;
