import { LOADING } from "../constants/actionTypes";

export const setLoading = (state) => {
  return { type: LOADING, payload: state };
};
