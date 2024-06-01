import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { currentuser } from "../../http/http-calls";

const addUserCredential = createAction("addUserCredential");
const updateUserData = createAction("updateUserData");
const clearUserCredential = createAction("clearUserCredential");

const getAndUpdateUserData = createAsyncThunk(
  "userCredential/getAndUpdateUserData",
  async (payload, thunkAPI) => {
    const res = await currentuser();
    return res?.user;
  }
);

export {
  addUserCredential,
  updateUserData,
  getAndUpdateUserData,
  clearUserCredential,
};
