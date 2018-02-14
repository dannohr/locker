import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import store from "./redux/store";
import { createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { devToolsEnhancer } from "redux-devtools-extension";

// import promise from "redux-promise-middleware";
import "./index.css";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducers";

// const createStoreWithMiddelware = applyMiddleware(promise())(createStore);

// const composeEnhancers = composeWithDevTools({
//   // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });

const store = createStore(
  reducers,
  /* preloadedState, */ devToolsEnhancer()
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
