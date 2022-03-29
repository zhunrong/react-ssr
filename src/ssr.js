import ReactDomServer from "react-dom/server";
import App from "./App";
import React from 'react';

export function render() {
  return ReactDomServer.renderToString(<App />);
}