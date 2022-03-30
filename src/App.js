import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function Page1() {
  // const [count, setCount] = useState(0);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div>
      <h2>page 1</h2>
      <div>计数：{count}</div>
      <div>
        操作：
        <button onClick={() => dispatch({ type: 'increase' })}>加一</button>
        <button onClick={() => dispatch({ type: 'decrease' })}>减一</button>
      </div>
      <div>
        <Link to="/page2">link to page2</Link>
      </div>
    </div>
  );
}

function Page2() {
  return (
    <div>
      <h2>page 2</h2>
      <div>
        <Link to="/page1">link to page1</Link>
      </div>
    </div>
  )
}

function App() {
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
