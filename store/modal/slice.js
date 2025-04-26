import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    singleModal: false,
    modals: {},
  },
  reducers: {
    setModalOpen: (state, action) => {
      const { modalId, isOpen } = action.payload;
      if (modalId) {
        state.modals[modalId] = isOpen;
      } else {
        state.singleModal = isOpen;
      }
    },
  },
});

export const { setModalOpen } = ModalSlice.actions;

export default ModalSlice;
