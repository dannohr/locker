import React from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Redirect from "react-router-dom/Redirect";

class ManuallyOpenDoors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doorStatus: [],
      buttonColor: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getAllInputStatus`).then(res => {
      const doorStatus = res.data;
      let colors = []
      for (var i = 0,  i < res.data[0].doorOpen.length; i++) {
        colors.push(this.state.doorOpen ? "blue" : "green")
      } 
      this.setState({ doorStatus });
      console.log(this.state);
    });
  }

  render() {
    let bgColor = this.state.doorOpen ? "blue" : "green";

    let style = {
      margin: 20,
      backgroundColor: "#45058e",
      secondary: true
    };

    console.log(style);

    return (
      <MuiThemeProvider>
        <div>
          <h1> Manually Open Lockers </h1>
          <div>
            <RaisedButton
              label="1"
              style={style}
              backgroundColor="red"
              onClick={() => this.callApi()}
            />
            <RaisedButton label="2" style={style} />
            <RaisedButton label="3" style={style} />
            <RaisedButton label="4" style={style} />
            <RaisedButton label="5" style={style} />
            <RaisedButton label="6" style={style} />
            <RaisedButton label="7" style={style} />
            <RaisedButton label="8" style={style} />
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
