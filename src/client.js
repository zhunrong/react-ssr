import React from "react";
import ReactDom from "react-dom";
// import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { create } from "./store";
import routes from "./routes";

ReactDom.hydrate(
  <Provider store={create()}>
    <Router>
      {/* <App /> */}
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById("app")
);
