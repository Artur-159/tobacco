import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";

export const FileAPI = Object.freeze({
  postUploadFiles: createAsyncThunk("post/upload-file", async (data) => {
    return await axiosPost.post("/upload-files", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }),
});
