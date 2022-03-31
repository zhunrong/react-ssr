import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import style from './Page1.scss';

function Page1() {
  // const [count, setCount] = useState(0);
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
  }, []);

  return (
    <div className={style.page1}>
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

export default Page1;