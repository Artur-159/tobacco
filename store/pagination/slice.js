import { createSlice } from "@reduxjs/toolkit";

const Pagination = createSlice({
  name: "Pagination slice",
  initialState: {
    offset: 0,
  },
  reducers: {
    setPage: (state, { payload: offset }) => {
      state.offset = offset;
    },
  },
});

export const { setPage } = Pagination.actions;

export default Pagination;
