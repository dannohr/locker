import React from "react";
import axios from "axios";

let style = { margin: 20 };

var styleDoorOpen = {
  margin: "20px",
  backgroundColor: "pink"
  // display: "inline-block"
};
var styleDoorClosed = {
  margin: "20px",
  backgroundColor: "#8de8aa"
  // display: "inline-block"
};

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
    //console.log(colors);
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
      .post(`http://localhost:3001/api/postOpenLock`, {
        lock: toOpen,
        attempts: 1
      })
      .then(res => {
        this.updateColors(res);
        console.log(res);
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
  }

  refreshInputs() {
    axios.get(`http://localhost:3001/api/getAllInputStatus`).then(res => {
      let doorStatus = res.data[0].doorOpen;

      this.setState({ doorStatus });
      console.log(res);
      //this.updateColors(res);
    });
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getAllInputStatus`).then(res => {
      let doorStatus = res.data[0].doorOpen;

      this.setState({ doorStatus });
      //console.log(res);
      //this.updateColors(res);
    });
    axios.get(`http://localhost:3001/api/getLockers`).then(res => {
      //console.log(res.data);
      this.setState({ lockers: res.data });
    });
  }

  render() {
    return (
      <div>
        <h2> Manually Open Lockers </h2>
        <div align="center">
          <div
            className="botton-toggle-open-mode"
            style={style}
            onClick={e => {
              this.handleToggleMode();
            }}
          >
            {this.state.singleMode
              ? "Open Single Doors"
              : "Open Multiple Doors"}
          </div>
          <p className="small-label-text">
            Touch Button to Change to
            {this.state.singleMode ? " Multiple " : " Single "}
            Door Mode
          </p>
          <div
            className="botton-toggle-open-mode"
            style={style}
            onClick={e => {
              this.refreshInputs();
            }}
          >
            Refresh
          </div>

          <hr />

          {!this.state.singleMode ? (
            <div
              className="botton-open-door"
              style={style}
              onClick={e => {
                this.callApi(this.state.selectedLocker);
              }}
            >
              Open Selected Doors
            </div>
          ) : null}
        </div>
        <div>
          {this.state.lockers.map(i => {
            return (
              <div
                key={i.port}
                className={
                  this.state.singleMode === false &&
                  this.state.selectedLocker.includes(i.port)
                    ? "botton-door selected-locker-button"
                    : "botton-door"
                }
                style={
                  this.state.doorStatus[i.port] === true
                    ? styleDoorOpen
                    : styleDoorClosed
                }
                onClick={() =>
                  this.state.singleMode === true
                    ? this.callApi(i.port)
                    : this.setLocker(i.port)
                }
              >
                {i.number}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ManuallyOpenDoors;
