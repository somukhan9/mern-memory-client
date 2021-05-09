import * as api from "../api/axios";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE,
  ERROR,
} from "../constants/actionTypes";
import { setLoading } from "./loading";

export const getPost = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.fetchPost();

    dispatch({ type: FETCH_ALL, payload: data.post });
    dispatch(setLoading(false));
  } catch (error) {
    console.log(error.response?.data?.message);
    dispatch({ type: ERROR, payload: error.response.data.message });
    dispatch(setLoading(false));
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);

    dispatch({ type: CREATE, payload: data.post });
  } catch (error) {
    console.log(error.response?.data?.message);
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  try {
    const { data } = await api.upDatePost(id, postData);

    dispatch({ type: UPDATE, payload: data.post });
  } catch (error) {
    console.log(error.response?.data?.message);
    dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data.post });
  } catch (error) {
    console.log(error.response?.data?.message);
    // dispatch({ type: ERROR, payload: error.response.data.message });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.response?.data?.message);
    // dispatch({ type: ERROR, payload: error.response.data.message });
  }
};
