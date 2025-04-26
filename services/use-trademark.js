import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

const BASE_URL = "/use-trade-mark";

export const UseTrademarkAPI = Object.freeze({
  getAll: createAsyncThunk("useTrademark/getAll", async (params) => 
    axiosGet.get(BASE_URL, { params })
  ),

  getOne: createAsyncThunk("useTrademark/getOne", async (id) => 
    axiosGet.get(`${BASE_URL}/${id}`)
  ),

  create: createAsyncThunk("useTrademark/create", async (data) => 
    axiosPost.post(BASE_URL, data)
  ),

  update: createAsyncThunk("useTrademark/update", async ({ id, ...data }) => 
    axiosPut.put(`${BASE_URL}/${id}`, data)
  ),

  remove: createAsyncThunk("useTrademark/remove", async (id) => 
    axiosDelete.delete(`${BASE_URL}/${id}`)
  ),
});
