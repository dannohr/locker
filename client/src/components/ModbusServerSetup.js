import React from "react";
// import { render } from "react-dom";
import axios from "axios";

import ReactTable from "react-table";
import "react-table/react-table.css";

import KeyboardedInput from "react-touch-screen-keyboard";
import "react-touch-screen-keyboard/lib/Keyboard.css";

class ModbusServerSetup extends React.Component {
  constructor() {
    super();
    this.state = { modbusServer: [] };
  }

  toggleCheck(id) {
    const modbusServer = [...this.state.modbusServer];
    let rowIndex = modbusServer.findIndex(function(x) {
      return x.id === id;
    });

    modbusServer[rowIndex].checked = !modbusServer[rowIndex].checked;
    modbusServer[rowIndex].active = !modbusServer[rowIndex].active;

    this.setState({ modbusServer: modbusServer });
  }

  handleSaveButtonClick(e, modbusServer) {
    axios.post(
      `http://localhost:3001/api/modbus/postMusbusServer`,
      modbusServer
    );
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/modbus/getMusbusServer`).then(res => {
      this.setState({ modbusServer: res.data });
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
    const { modbusServer } = this.state;

    return (
      <div>
        <h1> Edit Modbus Server Settings </h1>

        <div className="modbus-setup-table">
          <ReactTable
            data={modbusServer}
            columns={[
              {
                Header: "Active",
                maxWidth: 75,
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="double"
                      checked={original.checked === true}
                      onChange={() => this.toggleCheck(original.id)}
                    />
                  );
                }
              },
              {
                Header: "IP Address",
                Cell: ({ original }) => {
                  return (
                    <KeyboardedInput
                      value={original.ip}
                      inputClassName="table-field"
                      onChange={val =>
                        this.handleValueChange(original, { ip: val })
                      }
                      placeholder={"IP Address"}
                      enabled
                    />
                  );
                }
              },

              {
                Header: "Port",
                Cell: ({ original }) => {
                  return (
                    <KeyboardedInput
                      value={original.port.toString()}
                      inputClassName="table-field"
                      onChange={val =>
                        this.handleValueChange(original, { port: val })
                      }
                      placeholder={"Port"}
                      enabled
                    />
                  );
                }
              },

              {
                Header: "Number of Cards",
                Cell: ({ original }) => {
                  return (
                    <KeyboardedInput
                      value={original.numcards.toString()}
                      inputClassName="table-field"
                      onChange={val =>
                        this.handleValueChange(original, { numcards: val })
                      }
                      placeholder={"Cards"}
                      enabled
                    />
                  );
                }
              },
              {
                Header: "",
                id: "checkbox",
                accessor: "",
                maxWidth: 75,
                Cell: ({ original }) => {
                  return (
                    <button
                      type="button"
                      onClick={e => this.handleSaveButtonClick(e, original)}
                    >
                      Save
                    </button>
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

export default ModbusServerSetup;
