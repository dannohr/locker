import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import store from "./redux/store";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import "./index.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducers";

const createStoreWithMiddelware = applyMiddleware(promise())(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddelware(reducers)}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
