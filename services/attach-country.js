import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";

export const AttachCountryAPI = Object.freeze({
  postAttachCountryTradeMark: createAsyncThunk(
    "post/attach-trade",
    async (data) => {
      return await axiosPost.post("/trade-mark-attach-country", data);
    }
  ),
  postAttachCountryObjection: createAsyncThunk(
    "post/attach-objection",
    async (data) => {
      return await axiosPost.post("/objection-attach-country", data);
    }
  ),
  getOneAttachTradeMark: createAsyncThunk(
    "get/attach-tradeMark",
    async (id) => {
      return await axiosPost.get(`/trade-mark-attach-country/${id}`);
    }
  ),
  getOneAttachObjection: createAsyncThunk(
    "get/attach-objection",
    async (id) => {
      return await axiosPost.get(`/objection-attach-country/${id}`);
    }
  ),
  putOneAttachTradeMark: createAsyncThunk(
    "put/attach-tradeMark",
    async (data) => {
      return await axiosPost.put(
        `/trade-mark-attach-country/${data.trade_mark_id}`,
        data
      );
    }
  ),
  putOneAttachObjection: createAsyncThunk(
    "put/attach-objection",
    async (data) => {
      return await axiosPost.put(
        `/objection-attach-country/${data.objection}`,
        data
      );
    }
  ),
});
