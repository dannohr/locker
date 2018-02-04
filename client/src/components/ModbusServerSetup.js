import React from "react";
// import { render } from "react-dom";
import axios from "axios";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class ModbusServerSetup extends React.Component {
  constructor() {
    super();
    this.state = { modbusServer: [] };
    this.renderEditable = this.renderEditable.bind(this);
  }

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const modbusServer = [...this.state.modbusServer];
          modbusServer[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ modbusServer });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.modbusServer[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  toggleCheck(id) {
    let data = this.state.modbusServer;

    let rowIndex = data.findIndex(function(x) {
      return x.id === id;
    });

    data[rowIndex].checked = !data[rowIndex].checked;
    data[rowIndex].active = !data[rowIndex].active;

    this.setState({ modbusServer: data });
  }

  postChange(cellInfo) {}

  handleSaveButtonClick(e, original) {
    axios.post(`http://localhost:3001/api/modbus/postMusbusServer`, original);
    console.log(original);
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/modbus/getMusbusServer`).then(res => {
      this.setState({ modbusServer: res.data });
      console.log(this.state);
    });
  }

  render() {
    const { modbusServer } = this.state;
    return (
      <div>
        <h1> Edit Modbus Server Settings </h1>
        <div>
          <ReactTable
            data={modbusServer}
            columns={[
              {
                Header: "Active",
                id: "checkbox",
                accessor: "active",
                maxWidth: 75,
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={original.checked === true}
                      onChange={() => this.toggleCheck(original.id)}
                    />
                  );
                }
              },
              {
                Header: "IP Address",
                accessor: "ip",
                Cell: this.renderEditable
              },
              { Header: "Port", accessor: "port", Cell: this.renderEditable },
              {
                Header: "Number of Cards",
                accessor: "numcards",
                Cell: this.renderEditable
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
