import { createSlice } from "@reduxjs/toolkit";
import { OperationTypesAPI } from "../../services/operation-types";

const OperationTypes = createSlice({
  name: "Operation types slice",
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

    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        OperationTypesAPI.getOperationTypes.fulfilled,
        (state, action) => {
          const { data } = action.payload.data;
          state.list = data;
        }
      )

      .addCase(
        OperationTypesAPI.getOperationTypes.rejected,
        (state, action) => {
          state.errorStatus =
            action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
        }
      )

      .addCase(
        OperationTypesAPI.postOperationType.fulfilled,
        (state, action) => {
          state.status = action.payload.statusText;
        }
      )

      .addCase(
        OperationTypesAPI.postOperationType.rejected,
        (state, action) => {
          state.errorStatus =
            action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
        }
      )

      .addCase(OperationTypesAPI.deleteOperationType.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.id);
      })

      .addCase(
        OperationTypesAPI.deleteOperationType.rejected,
        (state, action) => {
          state.errorStatus =
            action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
        }
      );
  },
});

export const { setStatus, setClearErrorAction } = OperationTypes.actions;

export default OperationTypes;
