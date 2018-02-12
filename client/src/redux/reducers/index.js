// src/js/reducers/index.js

import { combineReducers } from "redux";

import { GET_STATUS } from "../constants/action-types";

// const initialState = {
//   systemType: "",
//   connected: "false",
//   testStuff: {}
// };

// const rootReducer = (state = initialState, action) => {
function getStatus(state = [], action) {
  //   console.log(initialState);
  switch (action.type) {
    case GET_STATUS:
      return { ...state, testStuff: [...state.testStuff, action.payload] };

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  getStatus
});

export default rootReducer;
