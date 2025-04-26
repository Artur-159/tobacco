import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const AuthorizationAPI = Object.freeze({
  getUsersList: createAsyncThunk("get/admin-list", async (params) => {
    return await axiosGet.get(`/users`, { params });
  }),
  getOneUser: createAsyncThunk("get/one-user", async (id) => {
    return await axiosGet.get(`/user/${id}`);
  }),
  getPersonalInfo: createAsyncThunk("get/personal-info", async () => {
    return await axiosGet.get(`/show-user`);
  }),
  postLogin: createAsyncThunk("post/login", async (data) => {
    return await axiosPost.post("/login", data);
  }),
  postUnblockUser: createAsyncThunk("post/unblock-user", async (id) => {
    return await axiosPost.post("/unblock-user", id);
  }),
  postLogout: createAsyncThunk("post/logout", async () => {
    return await axiosPost.post("/logout");
  }),
  postCreateUser: createAsyncThunk("post/create-user", async (data) => {
    return await axiosPost.post("/create-user", data);
  }),
  postRegSubAdmin: createAsyncThunk("post/registerAdmin", async (data) => {
    return await axiosPost.post("/register", data);
  }),
  deleteAdmin: createAsyncThunk("delete/delete-admin", async (id) => {
    return await axiosDelete.delete(`/delete-user/${id}`);
  }),
  putBlocked: createAsyncThunk("put/put-blocked", async (data) => {
    return await axiosPut.put(`/block-user`, data);
  }),
  putChangeRole: createAsyncThunk("put/put-change-role", async (data) => {
    return await axiosPut.put(`/change-role`, data);
  }),
  putUpdatePersonalInfo: createAsyncThunk(
    "put/update-personal",
    async (data) => {
      return await axiosPut.put(`/update-user`, data);
    }
  ),
  putUpdateUserInfo: createAsyncThunk("put/update-users", async (data) => {
    return await axiosPut.put(`/update-user`, data);
  }),
});
