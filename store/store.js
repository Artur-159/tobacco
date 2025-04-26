import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import Authorization from "./authorization/slice";
import City from "./city/slice";
import Company from "./company/slice";
import FileSlice from "./file/slice";
import ImageSlice from "./image/slice";
import ModalSlice from "./modal/slice";
import Pagination from "./pagination/slice";
import Partner from "./partner/slice";
import TradeMark from "./trademark/slice";
import DocTypes from "./doc-types/slice";
import LedgerDocs from "./ledger-docs/slice";
import OperationTypes from "./operation-types/slice";
import Operations from "./operations/slice";
import Objections from "./objections/slice";
import AttachCountry from "./attach-country/slice";
import UseTrademark from "./use-trademark/slice";

export const store = configureStore({
  reducer: {
    city: City.reducer,
    company: Company.reducer,
    authorization: Authorization.reducer,
    image: ImageSlice.reducer,
    modal: ModalSlice.reducer,
    pagination: Pagination.reducer,
    partner: Partner.reducer,
    file: FileSlice.reducer,
    tradeMark: TradeMark.reducer,
    docType: DocTypes.reducer,
    ledgerDocs: LedgerDocs.reducer,
    operationTypes: OperationTypes.reducer,
    operations: Operations.reducer,
    objections: Objections.reducer,
    attachCountry: AttachCountry.reducer,
    useTrademark: UseTrademark.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  devTools: process.env.REACT_APP_ENV !== "dev",
});
