import { LOADING } from "../constants/actionTypes";

export default (loading = true, action) => {
  switch (action.type) {
    case LOADING:
      return action.payload;
    default:
      return loading;
  }
};
