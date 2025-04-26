import { createSlice } from "@reduxjs/toolkit";
import { TradeMarkAPI } from "../../services/trademark";

const TradeMark = createSlice({
  name: "TradeMark slice",
  initialState: {
    list: [],
    oneTradeMark: [],
    deleteTradeMark: null,
    niceClasses: [],
    status: null,
    errorStatus: null,
    total: 0,
    download_link: null,
    filter: null,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDeleteTradeMark: (state, action) => {
      state.deleteTradeMark = action.payload;
    },
    setOneTradeMark: (state, action) => {
      state.oneTradeMark = action.payload;
    },
    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
    setAttachedCountry: (state, action) => {
      const countryId = action.payload;

      if (state.oneTradeMark && state.oneTradeMark.attach_countries) {
        state.oneTradeMark.attach_countries =
          state.oneTradeMark.attach_countries.filter(
            (country) => country.id !== countryId
          );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(TradeMarkAPI.getTradeMarks.fulfilled, (state, action) => {
        const response = action.payload.data;
        if (Array.isArray(response.trade_marks)) {
          state.list = response.trade_marks;
          state.total = response.total;
        } else if (response.file_path) {
          const baseUrl = process.env.REACT_APP_BASE_URL_IMG;
          const fullUrl = `${baseUrl.replace(
            /\/+$/,
            ""
          )}/${response.file_path.replace(/^\/+/, "")}`;
          window.open(fullUrl, "_blank");
        }
      })
      .addCase(TradeMarkAPI.getOneTradeMark.fulfilled, (state, action) => {
        state.oneTradeMark = action.payload.data.data;
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
      .addCase(TradeMarkAPI.getNiceClasses.fulfilled, (state, action) => {
        state.niceClasses = action.payload.data.data;
      })
      .addCase(TradeMarkAPI.postTradeMark.fulfilled, (state, action) => {
        state.status = action.payload.statusText;
      })
      .addCase(TradeMarkAPI.postTradeMark.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })
      .addCase(TradeMarkAPI.putUpdateTradeMark.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(TradeMarkAPI.putUpdateTradeMark.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })
      .addCase(TradeMarkAPI.deleteTradeMark.fulfilled, (state) => {
        state.list = state.list.filter(
          (item) => item.id !== state.deleteTradeMark
        );
        state.status = true;
      })
      .addCase(TradeMarkAPI.deleteAttachedCountry.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const {
  setStatusText,
  setClearErrorAction,
  setDeleteTradeMark,
  setOneTradeMark,
  setAttachedCountry,
  setFilter,
} = TradeMark.actions;

export default TradeMark;
