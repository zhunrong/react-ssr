import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increaseAction, decreaseAction, increaseActionDelay } from "./store";
import style from "./Page1.scss";

function Page1() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className={style.page1}>
      <header>
        <h2>Counter</h2>
      </header>

      <main>
        <div>计数：{count}</div>
        <div>
          操作：
          <button onClick={() => dispatch(increaseAction())}>立即加一</button>
          <button onClick={() => dispatch(increaseActionDelay(1))}>延迟加一</button>
          <button onClick={() => dispatch(decreaseAction())}>立即减一</button>
        </div>
      </main>

      <footer>
        <Link to="/todo">link to page2</Link>
      </footer>
    </div>
  );
}

// 在服务端被调用
Page1.ssrHook = async () => {
  // return {
  //   props: {}
  // }
}

export default Page1;
