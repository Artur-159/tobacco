import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const TradeMarkAPI = Object.freeze({
  getTradeMarks: createAsyncThunk("get/get-tradeMarks", async (params) => {
    const config = { params, headers: {} };

    if (params.print === "pdf") {
      config.headers = { print: "pdf", "pdf-image": params.pdf_image };
      if (params.page_pdf_info !== "a_page") delete config.params;
    }

    return await axiosGet.get(`/trade_marks`, config);
  }),
  getOneTradeMark: createAsyncThunk("get/one-tradeMark", async (params) => {
    return params.print === "pdf"
      ? await axiosGet.get(`/trade_marks/${params.id}`, {
          headers: {
            print: "pdf",
            "pdf-image": 1,
          },
        })
      : await axiosGet.get(`/trade_marks/${params}`);
  }),
  getNiceClasses: createAsyncThunk("get/get-niceClasses", async () => {
    return await axiosGet.get(`/nice-classes`);
  }),
  postTradeMark: createAsyncThunk("post/post-tradeMark", async (data) => {
    return await axiosPost.post("/trade_marks", data);
  }),
  putUpdateTradeMark: createAsyncThunk("put/put-tradeMark", async (data) => {
    return await axiosPut.put(`/trade_marks/${data.id}`, data);
  }),
  deleteTradeMark: createAsyncThunk("delete/delete-tradeMark", async (id) => {
    return await axiosDelete.delete(`/trade_marks/${id}`);
  }),
  deleteAttachedCountry: createAsyncThunk(
    "delete/delete-attach-country",
    async (id) => {
      return await axiosDelete.delete(`/trade-mark-attach-country/${id}`);
    }
  ),
});
