import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const PartnerAPI = Object.freeze({
  getPartners: createAsyncThunk("get/get-partners", async (params) => {
    return await axiosGet.get(`/partner-companies/`, { params });
  }),
  getPartnersApplicant: createAsyncThunk(
    "get/get-partners-applicant",
    async (params) => {
      return await axiosGet.get(`/partner-companies/`, { params });
    }
  ),
  getPartnersAuthorized: createAsyncThunk(
    "get/get-partners-authorized",
    async (params) => {
      return await axiosGet.get(`/partner-companies/`, { params });
    }
  ),
  getOnePartner: createAsyncThunk("get/one-partner", async (id) => {
    return await axiosGet.get(`/partner-companies/${id}`);
  }),
  postPartner: createAsyncThunk("post/post-partner", async (data) => {
    return await axiosPost.post("/partner-companies", data);
  }),
  postPartnerSearch: createAsyncThunk("post/post-search", async (data) => {
    return await axiosPost.post("/partner-companies/search", data);
  }),
  putUpdatePartner: createAsyncThunk("put/put-partner", async (data) => {
    return await axiosPut.put(`/partner-companies/${data.id}`, data);
  }),
  deletePartner: createAsyncThunk("delete/delete-partner", async (id) => {
    return await axiosDelete.delete(`/partner-companies/${id}`);
  }),
});
