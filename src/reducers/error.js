import { ERROR } from "../constants/actionTypes";

export default (errors = "", action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;

    default:
      return errors;
  }
};
