import { CURRENT_ID } from "../constants/actionTypes";

export default (id = null, action) => {
  switch (action.type) {
    case CURRENT_ID:
      return action.payload;

    default:
      return id;
  }
};
