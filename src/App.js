import React, { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect');
  }, []);

  return (
    <div>
      <div>计数：{count}</div>
      <div>
        操作：
        <button onClick={() => setCount(count + 1)}>加一</button>
        <button onClick={() => setCount(count - 1)}>减一</button>
      </div>
    </div>
  );
}

export default App;
