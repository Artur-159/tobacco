import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const CompanyAPI = Object.freeze({
  getCompanies: createAsyncThunk("get/get-companies", async (params) => {
    return await axiosGet.get(`/companies`, { params });
  }),
  getOneCompany: createAsyncThunk("get/one-companies", async (id) => {
    return await axiosGet.get(`/companies/${id}`);
  }),
  postCompany: createAsyncThunk("post/post-company", async (data) => {
    return await axiosPost.post("/companies", data);
  }),
  deleteCompany: createAsyncThunk("delete/delete-companies", async (id) => {
    return await axiosDelete.delete(`/companies/${id}`);
  }),
  putUpdateCompany: createAsyncThunk("put/put-company", async (data) => {
    return await axiosPut.put(`/companies/${data.id}`, data);
  }),
});
