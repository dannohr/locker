import React from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";

let style = { margin: 20 };

class ManuallyOpenDoors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doorStatus: [],
      colors: [],
      singleMode: true,
      selectedLocker: [],
      lockers: []
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
    let toOpen = [];
    if (!Array.isArray(num)) {
      toOpen.push(num);
    } else {
      toOpen = num;
    }
    axios
      .post(`http://192.168.2.2:3001/api/postOpenLock`, {
        lock: toOpen,
        attempts: 1
      })
      .then(res => {
        console.log(res.data);
        this.updateColors(res);
      });
  }

  setLocker(num) {
    console.log("Setting Locker", num);
    let selectedLocker = this.state.selectedLocker;
    if (selectedLocker.includes(num)) {
      selectedLocker.splice(selectedLocker.indexOf(num), 1);
    } else {
      selectedLocker.push(num);
    }

    this.setState({ selectedLocker });
    console.log(this.state.selectedLocker);
  }

  componentDidMount() {
    axios.get(`http://192.168.2.2:3001/api/getAllInputStatus`).then(res => {
      this.updateColors(res);
    });
    axios.get(`http://192.168.2.2:3001/api/getLockers`).then(res => {
      this.setState({ lockers: res.data });
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
                this.callApi(this.state.selectedLocker);
              }}
            />
          ) : null}

          <div>
            {this.state.lockers.map(i => {
              return (
                <RaisedButton
                  className={
                    this.state.singleMode === false &&
                    this.state.selectedLocker.includes(i.port)
                      ? "selected-locker-button"
                      : "button"
                  }
                  key={i.port}
                  label={i.number}
                  style={style}
                  backgroundColor={this.state.colors[i.port]}
                  onClick={() =>
                    this.state.singleMode === true
                      ? this.callApi(i.port)
                      : this.setLocker(i.port)
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
