import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { store } from "redux";
import { getStatusAction } from "../reducers/index";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ""
    };

    this.props.getStatusAction();
  }

  // state = {
  //   response: ""
  // };

  nextPath(path) {
    this.props.history.push(path);
  }

  componentDidMount() {
    // store.dispatch(getStatus);
    console.log(this.props);
    // console.log(store.getState());
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

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getStatusAction
  })(Footer)
);
