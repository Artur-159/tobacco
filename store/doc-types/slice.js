import { createSlice } from "@reduxjs/toolkit";
import { DocTypeAPI } from "../../services/doc-type";

const DocTypes = createSlice({
  name: "Doc type slice",
  initialState: {
    list: [],
    id: null,
    status: null,
    errorStatus: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DocTypeAPI.getDocTypes.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.list = data;
      })

      .addCase(DocTypeAPI.getDocTypes.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(DocTypeAPI.postDocType.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })

      .addCase(DocTypeAPI.postDocType.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(DocTypeAPI.deleteDocType.fulfilled, (state) => {
        state.status = "DELETED";
        state.list = state.list.filter((item) => item.id !== state.id);
      })

      .addCase(DocTypeAPI.deleteDocType.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const { setStatus, setId, setClearErrorAction } = DocTypes.actions;

export default DocTypes;
