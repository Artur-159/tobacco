import { createSlice } from "@reduxjs/toolkit";
import { LedgerDocsAPI } from "../../services/ledger-docs";

const LedgerDocs = createSlice({
  name: "Ledger docs slice",
  initialState: {
    list: [],
    trademarkObjectionList: [],
    decision_docs: [],
    id: null,
    total: null,
    status: null,
    errorStatus: null,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setClearErrorAction: (state, action) => {
      state.errorStatus = action.payload || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LedgerDocsAPI.getLedgerDocs.fulfilled, (state, action) => {
        const { ledger_docs, total } = action.payload.data.data;
        state.list = ledger_docs;
        state.total = total;
      })
      .addCase(LedgerDocsAPI.getDecisionDocs.fulfilled, (state, action) => {
        state.decision_docs = action.payload.data.data;
      })
      .addCase(
        LedgerDocsAPI.getTrademarkObjectionList.fulfilled,
        (state, action) => {
          const { data } = action.payload.data;
          state.trademarkObjectionList = data;
        }
      )

      .addCase(LedgerDocsAPI.getLedgerDocs.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(LedgerDocsAPI.postLedgerDoc.fulfilled, (state) => {
        state.status = true;
      })

      .addCase(LedgerDocsAPI.postLedgerDoc.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(LedgerDocsAPI.deleteLedgerDoc.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.id);
      })

      .addCase(LedgerDocsAPI.deleteLedgerDoc.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const { setStatusText, setId, setClearErrorAction } = LedgerDocs.actions;

export default LedgerDocs;
