import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const LedgerDocsOperationsAPI = Object.freeze({
  getLedgerDocs: createAsyncThunk(
    "get/ledger-docs-operations-list",
    async (params) => {
      return await axiosGet.get("/ledger-docs-operations-list", { params });
    }
  ),
});
