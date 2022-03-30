import ReactDomServer from "react-dom/server";
import App from "./App";
import React from 'react';
import {StaticRouter} from 'react-router-dom';

export function render(location, context) {
  return ReactDomServer.renderToString(
    <StaticRouter location={location} context={context}>
      <App />
    </StaticRouter>
  );
}