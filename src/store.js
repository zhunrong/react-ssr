import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const INIT = "INIT";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const ADD_TODO = 'ADD_TODO';
const DEL_TODO = 'DEL_TODO';

export function initAction(payload) {
  return {
    type: INIT,
    payload,
  };
}

export function increaseAction() {
  return {
    type: INCREASE,
  };
}

export function decreaseAction() {
  return {
    type: DECREASE,
  };
}

export function increaseActionDelay(delay) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increaseAction());
    }, delay * 1000);
  };
}

export function addTodoAction() {}

const simpleReducer = (state, action) => {
  switch (action.type) {
    case INIT:
      return Object.assign({}, state, {
        count: action.payload,
      });
    case INCREASE:
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case DECREASE:
      return Object.assign({}, state, {
        count: state.count - 1,
      });
  }
  return state;
};

const defaultState = {
  count: 0,
  todoList: []
};

export function create() {
  const initialState =
    typeof window === "object" ? window["INITIAL_STATE"] : defaultState;
  return createStore(simpleReducer, initialState, applyMiddleware(thunk));
}
