import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Page1 from './Page1';
import Page2 from './Page2';

function App() {
  const dispatch = useDispatch();

  if (typeof window === 'undefined') {
    dispatch({
      type: 'init',
      payload: 10
    })
  }

  return (
    <Switch>
      <Route path="/page1">
        <Page1 />
      </Route>
      <Route path="/page2">
        <Page2 />
      </Route>
      <Redirect to="/page1" />
    </Switch>
  )
}

export default App;
