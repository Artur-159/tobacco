import { createSlice } from "@reduxjs/toolkit";
import { OperationsAPI } from "../../services/operations";

const Operations = createSlice({
  name: "Operations slice",
  initialState: {
    list: [],
    trademarkObjectionList: [],
    id: null,
    total: null,
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
      .addCase(OperationsAPI.getOperations.fulfilled, (state, action) => {
        const { operations, total } = action.payload.data.data;

        state.list = operations;
        state.total = total;
      })

      .addCase(
        OperationsAPI.getTrademarkObjectionList.fulfilled,
        (state, action) => {
          const { data } = action.payload.data;

          state.trademarkObjectionList = data;
        }
      )

      .addCase(OperationsAPI.getOperations.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(OperationsAPI.postOperation.fulfilled, (state) => {
        state.status = true;
      })

      .addCase(OperationsAPI.postOperation.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(OperationsAPI.deleteOperation.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.id);
      });
  },
});

export const { setStatus, setId, setClearErrorAction } = Operations.actions;

export default Operations;
