import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction, delTodoAction } from './store';
import style from "./Page2.scss";

function fetchTodoApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['吃饭', '学习', '睡觉', '打球'])
    }, 500)
  })
}

async function fetchTodoList(dispatch) {
  const todoList = await fetchTodoApi();
  dispatch(addTodoAction(todoList));
}

function Page2() {
  const [inputValue, setInputValue] = useState('');
  const todoList = useSelector(state => state.todoList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todoList.length === 0) {
      fetchTodoList(dispatch);
    }
  }, [])

  const onChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const addTodo = () => {
    const todo = inputValue.trim();
    if (!todo) return;
    dispatch(addTodoAction([todo]));
    setInputValue('');
  }

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
                    <button onClick={() => dispatch(delTodoAction(index))}>删除</button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input value={inputValue} onChange={onChange}></input>
              </td>
              <td style={{ textAlign: "center" }}>
                <button onClick={addTodo}>新增</button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer>
        <Link to="/">link to page1</Link>
      </footer>
    </div>
  );
}

// 在服务端被调用
Page2.ssrHook = async (req, dispatch) => {
  await fetchTodoList(dispatch);
  // return {
  //   props: {
  //     list: ["运动"],
  //   },
  // };
};

export default Page2;
