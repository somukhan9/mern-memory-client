import { CURRENT_ID } from "../constants/actionTypes";

export const setCurrentId = (id) => {
  return { type: CURRENT_ID, payload: id };
};
