import axios from "axios";

const baseURL = "https://mern-memory-app-api.herokuapp.com";

const API = axios.create({ baseURL: baseURL });

API.interceptors.request.use(
  (req) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      req.headers["x-auth-token"] = accessToken;
    }
    return req;
  },
  (error) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return API.post(`/auth/refresh_token`, {
        refreshToken: refreshToken,
      }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.accessToken);
          console.log("Access Token Refreshed");
          return API(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export const fetchPost = () => API.get(`/post`);
export const createPost = (newPost) => API.post(`/post/create`, newPost);
export const upDatePost = (id, newPost) =>
  API.put(`/post/update/${id}`, newPost);
export const likePost = (id) => API.put(`/post/like/${id}`);
export const deletePost = (id) => API.delete(`/post/delete/${id}`);

export const signIn = (formData) => API.post(`/auth/login`, formData);
export const signUp = (formData) => API.post(`/auth/signup`, formData);
export const logout = (refreshToken) =>
  API.delete(`/auth/logout/${refreshToken}`);
