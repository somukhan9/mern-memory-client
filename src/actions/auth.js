import { SIGN_IN, SIGN_UP, LOGOUT, ERROR } from "../constants/actionTypes";
import * as api from "../api/axios";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: SIGN_IN, payload: data });
    history.push("/");
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: SIGN_UP, payload: data });
    history.push("/");
  } catch (error) {
    dispatch({ type: ERROR, payload: error.response.data.message });
    console.log(error.response.data.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    await api.logout(refreshToken);
    dispatch({ type: LOGOUT });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
