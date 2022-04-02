import React, { useState, useEffect } from "react";
import App from "./App";
import Page1 from './Page1';
import Page2 from './Page2';
import NotFound from './NotFound';

const lazyLoad = (load, props = {}) => {
  return () => {
    const [component, setComponent] = useState(null);
    useEffect(() => {
      (async () => {
        const mod = await load();
        setComponent(<mod.default {...props} />);
      })();
    }, []);
    return component;
  };
};

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Page1,
      },
      {
        path: "/todo",
        component: Page2,
      },
      {
        path: "*",
        component: NotFound,
      },
    ],
  },
];

export default routes;
