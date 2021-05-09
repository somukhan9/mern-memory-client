import { LOGOUT, SIGN_IN, SIGN_UP } from "../constants/actionTypes";

export default (state = { user: null }, action) => {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user };
    case SIGN_UP:
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...state, user: action.payload.user };
    case LOGOUT:
      localStorage.clear();
      return { ...state, user: null };
    default:
      return state;
  }
};
