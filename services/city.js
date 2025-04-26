import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const CityAPI = Object.freeze({
  getCities: createAsyncThunk("get/get-cities", async (params) => {
    return await axiosGet.get(`/cities`, { params });
  }),
  getMostUsedCities: createAsyncThunk(
    "get/get-most-used-city",
    async (params) => {
      return await axiosGet.get(`/most-used-countries`, {
        params,
      });
    }
  ),
  getOneCity: createAsyncThunk("get/one-cities", async (id) => {
    return await axiosGet.get(`/cities/${id}`);
  }),
  postCity: createAsyncThunk("post/post-city", async (data) => {
    return await axiosPost.post("/cities", data);
  }),
  deleteCity: createAsyncThunk("delete/delete-city", async (id) => {
    return await axiosDelete.delete(`/cities/${id}`);
  }),
  putUpdateCity: createAsyncThunk("put/put-city", async (data) => {
    return await axiosPut.put(`/cities/${data.id}`, data);
  }),
});
