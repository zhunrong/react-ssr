import ReactDomServer from "react-dom/server";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderRoutes, matchRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { create } from "./store";
import routes from "./routes";

export const createStore = create;

export function match(pathname) {
  return matchRoutes(routes, pathname);
}

/**
 * 调用匹配到的所有页面组件的 ssrHook 方法
 */
export async function invokeSsrHooks(req, dispatch) {
  const pathname = req.url;
  const matches = match(pathname).filter(
    (item) => typeof item.route.component.ssrHook === "function"
  );
  const result = await Promise.all(
    matches.map((item) => item.route.component.ssrHook(req, dispatch))
  );
  return result;
}

export function render(location, context = {}, store = create()) {
  return {
    content: ReactDomServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    ),
    store,
    context,
  };
}
