import React from "react";
import { renderRoutes } from "react-router-config";
import { initAction } from "./store";

function App({ route }) {
  return (
    <>{renderRoutes(route.routes)}</>
  );
}

App.ssrHook = async (req, dispatch) => {

  dispatch(initAction(99));

  // return {
  //   props: {}
  // }
}

export default App;
