import ReactDomServer from "react-dom/server";
import App from "./App";
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {create} from './store';

export function render(location, context) {
  const store = create();
  return {
    content: ReactDomServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    ),
    store
  };
}