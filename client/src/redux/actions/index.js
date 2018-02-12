import axios from "axios";
import { GET_STATUS } from "../constants/action-types";

export function getStatus() {
  const request = axios.get(`http://localhost:3001/api/getAllInputStatus`);
  console.log("the action");

  return {
    type: GET_STATUS,
    payload: request
  };
}
