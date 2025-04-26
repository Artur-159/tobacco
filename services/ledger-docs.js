import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const LedgerDocsAPI = Object.freeze({
  getLedgerDocs: createAsyncThunk("get/get-ledger-docs", async (params) => {
    return await axiosGet.get("/ledger-docs", { params });
  }),
  getDecisionDocs: createAsyncThunk("get/get-decision-docs", async (params) => {
    return await axiosGet.get("/decision-docs", { params });
  }),
  getTrademarkObjectionList: createAsyncThunk(
    "get/get-trademark-objection-list",
    async () => {
      return await axiosGet.get(`/trade-mark-objection-list`);
    }
  ),
  postLedgerDoc: createAsyncThunk("post/ledger-doc", async (data) => {
    return await axiosPost.post("/ledger-docs", data);
  }),
  deleteLedgerDoc: createAsyncThunk("delete/ledger-doc", async (id) => {
    return await axiosDelete.delete(`/ledger-docs/${id}`);
  }),
});
