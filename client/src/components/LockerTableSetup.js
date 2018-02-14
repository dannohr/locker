import React from "react";
// import { render } from "react-dom";
import axios from "axios";

import ReactTable from "react-table";
import "react-table/react-table.css";

import KeyboardedInput from "react-touch-screen-keyboard";
import "react-touch-screen-keyboard/lib/Keyboard.css";

class LockerTableSetup extends React.Component {
  constructor() {
    super();
    this.state = { lockers: [] };
  }

  toggleCheck(id) {
    // const lockers = [...this.state.lockers];
    // let rowIndex = modbusServer.findIndex(function(x) {
    //   return x.id === id;
    // });
    // modbusServer[rowIndex].checked = !modbusServer[rowIndex].checked;
    // modbusServer[rowIndex].active = !modbusServer[rowIndex].active;
    // this.setState({ modbusServer: modbusServer });
  }

  handleSaveButtonClick(e, modbusServer) {
    axios.post(
      `http://localhost:3001/api/modbus/postMusbusServer`,
      modbusServer
    );
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/getLockers`).then(res => {
      this.setState({ lockers: res.data });
    });
  }

  handleValueChange(original, val) {
    const modbusServer = [...this.state.modbusServer];
    let rowIndex = modbusServer.findIndex(function(x) {
      return x.id === original.id;
    });
    modbusServer[rowIndex][Object.keys(val)] = val[Object.keys(val)];
    this.setState({ modbusServer: modbusServer });
  }

  render() {
    const { lockers } = this.state;

    return (
      <div>
        <h1> Edit Locker Table Settings </h1>

        <div className="modbus-setup-table">
          <ReactTable
            data={lockers}
            columns={[
              // {
              //   Header: "Active",
              //   maxWidth: 75,
              //   Cell: ({ original }) => {
              //     return (
              //       <input
              //         type="checkbox"
              //         className="double"
              //         checked={original.checked === true}
              //         onChange={() => this.toggleCheck(original.id)}
              //       />
              //     );
              //   }
              // },
              {
                Header: "Port",
                Cell: ({ original }) => {
                  return (
                    <KeyboardedInput
                      value={original.port}
                      inputClassName="table-field"
                      onChange={val =>
                        this.handleValueChange(original, { port: val })
                      }
                      placeholder={"IO Port"}
                      enabled
                    />
                  );
                }
              },

              {
                Header: "Number",
                Cell: ({ original }) => {
                  return (
                    <KeyboardedInput
                      value={original.number.toString()}
                      inputClassName="table-field"
                      onChange={val =>
                        this.handleValueChange(original, { number: val })
                      }
                      placeholder={"Port"}
                      enabled
                    />
                  );
                }
              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }
}

export default LockerTableSetup;
