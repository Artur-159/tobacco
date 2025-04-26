import { createSlice } from "@reduxjs/toolkit";
import { CompanyAPI } from "../../services/company";

const Company = createSlice({
  name: "Company slice",
  initialState: {
    list: [],
    oneCompany: [],
    deleteCompany: null,
    status: null,
    errorStatus: null,
    total: 0,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setDeleteCompany: (state, action) => {
      state.deleteCompany = action.payload;
    },
    setOneCompany: (state, action) => {
      state.oneCompany = action.payload;
    },
    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompanyAPI.getCompanies.fulfilled, (state, action) => {
        const { companies, total } = action.payload.data.data;
        state.list = companies;
        state.total = total;
      })

      .addCase(CompanyAPI.postCompany.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })

      .addCase(CompanyAPI.postCompany.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(CompanyAPI.getOneCompany.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.oneCompany = data;
      })

      .addCase(CompanyAPI.putUpdateCompany.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })

      .addCase(CompanyAPI.putUpdateCompany.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(CompanyAPI.deleteCompany.fulfilled, (state, action) => {
        state.status = true;
        state.list = state.list.filter(
          (item) => item.id !== state.deleteCompany
        );
      })

      .addCase(CompanyAPI.deleteCompany.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const {
  setStatusText,
  setDeleteCompany,
  setOneCompany,
  setClearErrorAction,
} = Company.actions;

export default Company;
