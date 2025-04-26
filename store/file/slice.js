import { createSlice } from "@reduxjs/toolkit";
import { FileAPI } from "../../services/file";

const FileSlice = createSlice({
  name: "File",
  initialState: {
    listFile: [],
    fileIndex: null,
  },
  reducers: {
    setSaveFileIndex: (state, action) => {
      state.fileIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FileAPI.postUploadFiles.fulfilled, (state, action) => {
      const newFile = action.payload?.data[0];

      if (newFile) {
        const updatedList = [...state.listFile];
        updatedList[state.fileIndex] = {
          ...updatedList[state.fileIndex],
          file: newFile,
        };

        state.listFile = updatedList;
      }
    });
  },
});

export const { setSaveFileIndex } = FileSlice.actions;

export default FileSlice;
