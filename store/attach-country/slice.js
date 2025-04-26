import { createSlice } from "@reduxjs/toolkit";
import { AttachCountryAPI } from "../../services/attach-country";

const AttachCountry = createSlice({
  name: "AttachCountry slice",
  initialState: {
    status: null,
    errorStatus: null,
    oneAttachTradeMark: null,
    oneAttachObjection: null,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setClearAttachTradeMark: (state) => {
      state.oneAttachTradeMark = null;
    },
    setClearAttachObjection: (state) => {
      state.oneAttachObjection = null;
    },

    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        AttachCountryAPI.getOneAttachTradeMark.fulfilled,
        (state, action) => {
          const { data } = action.payload.data;
          state.oneAttachTradeMark = data;
        }
      )
      .addCase(
        AttachCountryAPI.getOneAttachObjection.fulfilled,
        (state, action) => {
          const { data } = action.payload.data;
          state.oneAttachObjection = data;
        }
      )
      .addCase(
        AttachCountryAPI.postAttachCountryTradeMark.fulfilled,
        (state, action) => {
          const { statusText } = action.payload;
          state.status = statusText;
        }
      )
      .addCase(
        AttachCountryAPI.postAttachCountryObjection.fulfilled,
        (state, action) => {
          const { statusText } = action.payload;
          state.status = statusText;
        }
      )
      .addCase(
        AttachCountryAPI.postAttachCountryTradeMark.rejected,
        (state, action) => {
          state.errorStatus =
            action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
        }
      )
      .addCase(
        AttachCountryAPI.postAttachCountryObjection.rejected,
        (state, action) => {
          state.errorStatus =
            action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
        }
      )
      .addCase(
        AttachCountryAPI.putOneAttachObjection.fulfilled,
        (state, action) => {
          state.status = action.payload.status;
        }
      )
      .addCase(
        AttachCountryAPI.putOneAttachTradeMark.fulfilled,
        (state, action) => {
          state.status = action.payload.status;
        }
      );
  },
});

export const {
  setStatusText,
  setClearErrorAction,
  setClearAttachTradeMark,
  setClearAttachObjection,
} = AttachCountry.actions;

export default AttachCountry;
