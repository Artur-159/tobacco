import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";

export const VideoImageAPI = Object.freeze({
  postVideosImages: createAsyncThunk("post/video-image", async (data) => {
    return await axiosPost.post("/upload-mixed-media", data);
  }),
  postImage: createAsyncThunk("post/upload-image", async (data) => {
    return await axiosPost.post("/upload-images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }),
  postListImages: createAsyncThunk("post/list-image", async (data) => {
    return await axiosPost.post("/upload-mixed-media", data);
  }),
});
