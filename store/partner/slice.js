import { createSlice } from "@reduxjs/toolkit";
import { PartnerAPI } from "../../services/partner";

const Partner = createSlice({
  name: "Partner slice",
  initialState: {
    applicants: [],
    authorizes: [],
    onePartner: [],
    partners: [],
    deletePartner: null,
    status: null,
    errorStatus: null,
    applicants_total: 0,
    authorizes_total: 0,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setDeletePartner: (state, action) => {
      state.deletePartner = action.payload;
    },
    setOnePartner: (state, action) => {
      state.onePartner = action.payload;
    },
    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PartnerAPI.getPartners.fulfilled, (state, action) => {
        const { companies, total } = action.payload.data.data;
        state.partners = companies;
        state.applicants_total = total;
      })
      .addCase(PartnerAPI.getPartnersApplicant.fulfilled, (state, action) => {
        const { companies, total } = action.payload.data.data;
        state.applicants = companies;
        state.applicants_total = total;
      })
      .addCase(PartnerAPI.getPartnersAuthorized.fulfilled, (state, action) => {
        const { companies, total } = action.payload.data.data;
        state.authorizes = companies;
        state.authorizes_total = total;
      })
      .addCase(PartnerAPI.getOnePartner.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.onePartner = data;
      })
      .addCase(PartnerAPI.postPartner.fulfilled, (state, action) => {
        const { statusText } = action.payload;
        state.status = statusText;
      })
      .addCase(PartnerAPI.postPartner.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })
      .addCase(PartnerAPI.postPartnerSearch.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.list = data;
      })

      .addCase(PartnerAPI.putUpdatePartner.fulfilled, (state, action) => {
        const { status } = action.payload;
        state.status = status;
      })
      .addCase(PartnerAPI.putUpdatePartner.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })
      .addCase(PartnerAPI.deletePartner.fulfilled, (state) => {
        const path = window.location.pathname.split("-").pop();

        if (path === "applicant") {
          state.applicants = state.applicants.filter(
            (item) => item.id !== state.deletePartner
          );
        } else if (path === "authorized") {
          state.authorizes = state.authorizes.filter(
            (item) => item.id !== state.deletePartner
          );
        }

        state.status = "true";
      })
      .addCase(PartnerAPI.deletePartner.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const {
  setStatusText,
  setClearErrorAction,
  setDeletePartner,
  setOnePartner,
} = Partner.actions;

export default Partner;
