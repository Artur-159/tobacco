import { createSlice } from "@reduxjs/toolkit";
import { ObjectionsAPI } from "../../services/objections";

const Objections = createSlice({
  name: "objections",
  initialState: {
    list: null,
    oneObjection: null,
    objectionId: null,
    status: null,
    errorStatus: null,
    total: 0,
    filter: false,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setObjectionId: (state, action) => {
      state.objectionId = action.payload;
    },
    setOneObjection: (state, action) => {
      state.oneObjection = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.errorStatus = action.payload || null;
    },
    setAttachedCountry: (state, action) => {
      const countryId = action.payload;

      if (state.oneObjection && state.oneObjection.attach_countries) {
        state.oneObjection.attach_countries =
          state.oneObjection.attach_countries.filter(
            (country) => country.id !== countryId
          );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ObjectionsAPI.getObjections.fulfilled, (state, action) => {
        const response = action.payload.data;

        if (response?.data) {
          const { objections, total } = response.data;

          if (Array.isArray(objections)) {
            state.list = objections;
            state.total = total;
          }
        } else if (response?.file_path) {
          const baseUrl = process.env.REACT_APP_BASE_URL_IMG;
          const fullUrl = `${baseUrl.replace(
            /\/+$/,
            ""
          )}/${response.file_path.replace(/^\/+/, "")}`;
          window.open(fullUrl, "_blank");
        }
      })
      .addCase(ObjectionsAPI.getObjection.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.oneObjection = data;
        let response = action.payload.data;
        if (response.file_path) {
          const baseUrl = process.env.REACT_APP_BASE_URL_IMG;
          const fullUrl = `${baseUrl.replace(
            /\/+$/,
            ""
          )}/${response.file_path.replace(/^\/+/, "")}`;
          window.open(fullUrl, "_blank");
        }
      })
      .addCase(ObjectionsAPI.postObjection.fulfilled, (state, action) => {
        const { statusText } = action.payload;
        state.status = statusText;
      })
      .addCase(ObjectionsAPI.postObjection.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })
      .addCase(ObjectionsAPI.putObjection.fulfilled, (state, action) => {
        const { status } = action.payload;
        state.status = status;
      })
      .addCase(ObjectionsAPI.deleteObjection.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.objectionId);
        state.status = true;
      })
      .addCase(ObjectionsAPI.deleteObjection.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })
      .addCase(
        ObjectionsAPI.deleteAttachedCountry.rejected,
        (state, action) => {
          state.errorStatus =
            action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
        }
      );
  },
});

export const {
  setStatus,
  setObjectionId,
  setOneObjection,
  setErrorStatus,
  setAttachedCountry,
  setFilter,
} = Objections.actions;

export default Objections;
