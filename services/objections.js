import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const ObjectionsAPI = Object.freeze({
  getObjections: createAsyncThunk("get/get-objections", async (params) => {
    const config = { params, headers: {} };
    if (params.print === "pdf") {
      config.headers = { print: "pdf", "pdf-image": params.pdf_image };
      if (params.page_pdf_info !== "a_page") delete config.params;
    }

    return await axiosGet.get(`/objections`, config);
  }),
  getObjection: createAsyncThunk("get/one-objection", async (params) => {
    return params.print === "pdf"
      ? await axiosGet.get(`/objections/${params.id}`, {
          headers: {
            print: "pdf",
            "pdf-image": params.pdf_image,
          },
        })
      : await axiosGet.get(`/objections/${params}`);
  }),
  postObjection: createAsyncThunk("post/post-objection", async (data) => {
    return await axiosPost.post("/objections", data);
  }),
  putObjection: createAsyncThunk("put/put-objection", async (data) => {
    return await axiosPut.put(`/objections/${data.id}`, data);
  }),
  deleteObjection: createAsyncThunk("delete/delete-objection", async (id) => {
    return await axiosDelete.delete(`/objections/${id}`);
  }),
  deleteAttachedCountry: createAsyncThunk(
    "delete/delete-attach-country",
    async (id) => {
      return await axiosDelete.delete(`/objection-attach-country/${id}`);
    }
  ),
});
