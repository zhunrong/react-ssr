import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { create } from './store';

ReactDom.hydrate(
  <Provider store={create()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
