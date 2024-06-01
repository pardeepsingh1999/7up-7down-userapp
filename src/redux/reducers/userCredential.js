import { createSlice } from "@reduxjs/toolkit";
import {
  addUserCredential,
  updateUserData,
  getAndUpdateUserData,
  clearUserCredential,
} from "../actions";

const initialState = {
  token: null,
  user: null,
};

const userCredentialSlice = createSlice({
  name: "userCredential",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserCredential, (state, action) => {
        state.token = action.payload?.token;
        state.user = action.payload?.user;
      })

      .addCase(updateUserData, (state, action) => {
        state.user = action.payload;
      })

      .addCase(clearUserCredential, (state, action) => {
        state.token = null;
        state.user = null;
      })

      .addCase(getAndUpdateUserData.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAndUpdateUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(getAndUpdateUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const userCredentialReducer = userCredentialSlice.reducer;
