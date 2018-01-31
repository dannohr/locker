import React, { Component } from "react";

class Footer extends Component {
  state = {
    response: ""
  };

  componentDidMount() {
    this.isLockerSystemConnected()
      .then(res =>
        this.setState({
          response: "Connected to locker system:  " + res[0].connect.toString()
        })
      )
      .catch(err => console.log(err));
  }

  isLockerSystemConnected = async () => {
    const response = await fetch("/api/getAllInputStatus");
    const body = await response.json();
    // console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };
  render() {
    return (
      <div className="App-footer">
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}
export default Footer;
