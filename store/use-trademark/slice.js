import { createSlice } from "@reduxjs/toolkit";
import { UseTrademarkAPI } from "../../services/use-trademark";

const UseTrademark = createSlice({
  name: "use trademarks",
  initialState: {
    useTrademarksList: [],
    oneUseTrademark: [],
    status: null,
    total: 0,
    errorStatus: null,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setUseTrademark: (state, action) => {
      state.oneCity = action.payload;
    },
    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UseTrademarkAPI.getAll.fulfilled, (state, action) => {
        const { use_trade_marks, total } = action.payload.data.data;
        state.useTrademarksList = use_trade_marks;
        state.total = total;
      })

      .addCase(UseTrademarkAPI.getAll.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(UseTrademarkAPI.getOne.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.oneUseTrademark = data;
      })

      .addCase(UseTrademarkAPI.getOne.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(UseTrademarkAPI.create.fulfilled, (state) => {
        state.status = true;
      })

      .addCase(UseTrademarkAPI.update.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.errorStatus = null;
      })

      .addCase(UseTrademarkAPI.update.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(UseTrademarkAPI.remove.fulfilled, (state, action) => {
        state.useTrademarksList = state.useTrademarksList.filter(
          (item) => item.id !== action.meta.arg
        );
        state.status = true;
      })

      .addCase(UseTrademarkAPI.remove.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const {
  setStatusText,
  setId,
  setUseTrademark,
  setLists,
  setClearErrorAction,
} = UseTrademark.actions;

export default UseTrademark;
