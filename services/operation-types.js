import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const OperationTypesAPI = Object.freeze({
  getOperationTypes: createAsyncThunk("get/get-operation-types", async () => {
    return await axiosGet.get(`/operation-type`);
  }),
  postOperationType: createAsyncThunk("post/operation-type", async (data) => {
    return await axiosPost.post("/operation-type", data);
  }),
  deleteOperationType: createAsyncThunk("delete/operation-type", async (id) => {
    return await axiosDelete.delete(`/operation-type/${id}`);
  }),
});
