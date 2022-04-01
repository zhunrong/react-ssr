import App from "./App";
import Page1 from "./Page1";
import Page2 from "./Page2";

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/page1",
        component: Page1,
      },
      {
        path: "/page2",
        component: Page2,
      },
    ],
  },
];

export default routes;
