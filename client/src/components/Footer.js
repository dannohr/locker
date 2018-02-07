import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Footer extends Component {
  state = {
    response: ""
  };

  nextPath(path) {
    this.props.history.push(path);
  }

  componentDidMount() {
    this.isLockerSystemConnected()
      .then(res =>
        this.setState({
          response: res[0].connect.toString()
        })
      )
      .catch(err => console.log(err));
  }

  isLockerSystemConnected = async () => {
    const response = await fetch("http://localhost:3001/api/getAllInputStatus");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log("is connected");
    // console.log(body[0].connect);
    return body;
  };

  render() {
    return (
      <div className="App-footer">
        <div
          className="App-footer-icon"
          onClick={() => this.nextPath("/setup")}
        >
          Setup
        </div>
        <div className="App-footer-status">
          <p>Connected to locker system: {this.state.response}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(Footer);
// export default Footer;
