import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const DocTypeAPI = Object.freeze({
  getDocTypes: createAsyncThunk("get/get-doc-types", async () => {
    return await axiosGet.get("/doc-type?top_docs=false");
  }),
  postDocType: createAsyncThunk("post/doc-type", async (data) => {
    return await axiosPost.post("/doc-type", data);
  }),
  deleteDocType: createAsyncThunk("delete/doc-type", async (id) => {
    return await axiosDelete.delete(`/doc-type/${id}`);
  }),
});
