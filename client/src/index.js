import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
