import App from "./App";
import Page1 from "./Page1";
import Page2 from "./Page2";
import NotFound from './NotFound';

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
        path: '*',
        component: NotFound
      }
    ],
  },
];

export default routes;
