import { createSlice } from "@reduxjs/toolkit";
import { CityAPI } from "../../services/city";

const City = createSlice({
  name: "City slice",
  initialState: {
    list: [],
    countries: [],
    mostUsedCountries: [],
    oneCity: [],
    deleteCity: null,
    status: null,
    total: 0,
    countriesTotal: 0,
    errorStatus: null,
  },
  reducers: {
    setStatusText: (state, action) => {
      state.status = action.payload;
    },
    setDeleteCity: (state, action) => {
      state.deleteCity = action.payload;
    },
    setOneCity: (state, action) => {
      state.oneCity = action.payload;
    },
    setClearErrorAction: (state) => {
      state.errorStatus = null;
    },
    setLists: (state, action) => {
      state.list = action.payload;
      state.mostUsedCountries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CityAPI.getCities.fulfilled, (state, action) => {
        const { cities, total } = action.payload.data.data;
        state.list = cities;
        state.total = total;
      })

      .addCase(CityAPI.getMostUsedCities.fulfilled, (state, action) => {
        const { countries, total } = action.payload.data.data;
        state.mostUsedCountries = countries;
        state.countriesTotal = total;
      })

      .addCase(CityAPI.postCity.fulfilled, (state, action) => {
        const { statusText } = action.payload;
        state.status = statusText;
      })

      .addCase(CityAPI.postCity.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(CityAPI.getOneCity.fulfilled, (state, action) => {
        const { data } = action.payload.data;
        state.oneCity = data;
      })

      .addCase(CityAPI.putUpdateCity.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.errorStatus = null;
      })

      .addCase(CityAPI.putUpdateCity.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      })

      .addCase(CityAPI.deleteCity.fulfilled, (state) => {
        state.list = state.list.filter((item) => item.id !== state.deleteCity);
      })

      .addCase(CityAPI.deleteCity.rejected, (state, action) => {
        state.errorStatus =
          action.error?.message || "⚠️ Առկա են տեխնիկական խնդիրներ";
      });
  },
});

export const {
  setStatusText,
  setDeleteCity,
  setOneCity,
  setLists,
  setClearErrorAction,
} = City.actions;

export default City;
