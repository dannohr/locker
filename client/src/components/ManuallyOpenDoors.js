import React from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

let style = { margin: 20 };

let lockers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

class ManuallyOpenDoors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doorStatus: [],
      colors: [],
      singleMode: false,
      selectedLocker: []
    };
  }

  updateColors(res) {
    let doorStatus = res.data[0].doorOpen;
    let colors = [];
    for (var i = 0; i < doorStatus.length; i++) {
      colors.push(doorStatus[i] ? "pink" : "#8de8aa");
    }
    this.setState({ doorStatus, colors });
  }

  handleToggleMode() {
    this.setState({
      singleMode: !this.state.singleMode
    });
  }

  callApi(num) {
    console.log("Opening Door", num);
    axios
      .post(`http://localhost:3001/api/postOpenLock`, {
        lock: [num],
        attempts: 3
      })
      .then(res => {
        this.updateColors(res);
      });
  }

  setLocker(num) {
    console.log("Setting Locker", num);
    let selectedLocker = this.state.selectedLocker;
    selectedLocker.push(num);
    this.setState({ selectedLocker });

    console.log(this.state);
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getAllInputStatus`).then(res => {
      this.updateColors(res);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <h2> Manually Open Lockers </h2>
          <hr />
          <div>
            {this.state.singleMode
              ? "Open Single Doors"
              : "Open Multiple Doors"}

            <RaisedButton
              label="Toggle"
              style={style}
              onClick={e => {
                this.handleToggleMode();
              }}
            />
            <hr />
          </div>

          {!this.state.singleMode ? (
            <RaisedButton
              label="Open Selected"
              style={style}
              onClick={e => {
                this.handleToggleMode();
              }}
            />
          ) : null}

          <div>
            {lockers.map(i => {
              return (
                <RaisedButton
                  className={
                    this.state.singleMode === false &&
                    this.state.selectedLocker.includes(i)
                      ? "selected-locker-button"
                      : "button"
                  }
                  key={i}
                  label={i}
                  style={style}
                  backgroundColor={this.state.colors[i - 1]}
                  onClick={() =>
                    this.state.singleMode === true
                      ? this.callApi(i - 1)
                      : this.setLocker(i)
                  }
                />
              );
            })}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default ManuallyOpenDoors;
