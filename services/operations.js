import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const OperationsAPI = Object.freeze({
  getOperations: createAsyncThunk("get/operations", async (params) => {
    return await axiosGet.get("/operation", { params });
  }),
  getTrademarkObjectionList: createAsyncThunk(
    "get/get-trademark-objection-list",
    async () => {
      return await axiosGet.get(`/trade-mark-objection-list`);
    }
  ),
  postOperation: createAsyncThunk("post/operation", async (data) => {
    return await axiosPost.post("/operation", data);
  }),
  deleteOperation: createAsyncThunk("delete/operation", async (id) => {
    return await axiosDelete.delete(`/operation/${id}`);
  }),
});
