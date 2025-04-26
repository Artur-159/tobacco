import { createSlice } from "@reduxjs/toolkit";
import { VideoImageAPI } from "../../services/videos-image";

const ImageSlice = createSlice({
  name: "image",
  initialState: {
    image: "",
    listVideosImages: [],
  },
  reducers: {
    setImageSlice: (state, action) => {
      state.image = action.payload;
    },
    setDeleteImage: (state) => {
      state.image = null;
    },
    setListVideosImages: (state, action) => {
      state.listVideosImages = action.payload;
    },
    setDeleteVideosOrImages: (state, action) => {
      state.listVideosImages = state.listVideosImages.filter(
        (_, ind) => ind !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(VideoImageAPI.postImage.fulfilled, (state, action) => {
        state.image = action.payload.data[0].path;
      })
      .addCase(VideoImageAPI.postVideosImages.fulfilled, (state, action) => {
        state.listVideosImages = [
          ...(state.listVideosImages || []),
          ...action.payload?.data,
        ];
      });
  },
});

export const {
  setImageSlice,
  setListVideosImages,
  setDeleteVideosOrImages,
  setDeleteImage,
} = ImageSlice.actions;

export default ImageSlice;
