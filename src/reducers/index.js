import { combineReducers } from "redux";
import posts from "./post";
import auth from "./auth";
import errors from "./error";
import loading from "./loading";
import postCurrentId from "./postCurrentId";

export default combineReducers({
  posts,
  auth,
  errors,
  loading,
  postCurrentId,
});
