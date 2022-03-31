import { createStore } from "redux";

const simpleReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return Object.assign({}, state, {
        count: action.payload,
      });
    case "increase":
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case "decrease":
      return Object.assign({}, state, {
        count: state.count - 1,
      });
  }
  return state;
};

export function create() {
  const initialState =
    typeof window === "object"
      ? window["INITIAL_STATE"]
      : {
          count: 0,
        };
  return createStore(simpleReducer, initialState);
}
