import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Page2.scss";

function Page2() {
  const [todoList, setTodoList] = useState(["吃饭", "学习"]);

  return (
    <div className={style.page2}>
      <header>
        <h2>Todo List</h2>
      </header>

      <main>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>事项</th>
              <th style={{ width: "150px" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item}</td>
                  <td style={{ textAlign: "center" }}>
                    <button>删除</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <footer>
        <Link to="/page1">link to page1</Link>
      </footer>
    </div>
  );
}

Page2.ssrHook = async () => {
  return {
    props: {
      list: ["运动"],
    },
  };
};

export default Page2;
