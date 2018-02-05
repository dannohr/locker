import React from "react";
import { withRouter } from "react-router-dom";

const style = {
  margin: 20
};

class Setup extends React.Component {
  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div align="center">
        <h1> Setup </h1>
        <div
          className="botton-open-door"
          style={style}
          onClick={() => this.nextPath("/modbussetup")}
        >
          Modbus Setup
        </div>
        <div
          className="botton-open-door"
          style={style}
          onClick={() => this.nextPath("/manualdooropen")}
        >
          Manually Open Doors
        </div>
      </div>
    );
  }
}

export default withRouter(Setup);
