import {createSlice} from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addNotification: (state, {payload}) => {
      if (state.newMessages[payload]) {
        state.newMessages[payload] = state.newMessages[payload] + 1;
      } else {
        state.newMessages[payload] = 1;
      }
    },
    resetNotification: (state, {payload}) => {
      delete state.newMessages[payload];
    },
  },
  extraReducers: (builder) => {
    //   save user after signup
    builder.addMatcher(
      appApi.endpoints.signupUser.matchFulfilled,
      (state, {payload}) => payload
    );
    // login
    builder.addMatcher(
      appApi.endpoints.loginUSer.matchFulfilled,
      (state, {payload}) => payload
    );
    // logout
    builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null);
  },
});

export const {addNotification, resetNotification} = userSlice.actions;

export default userSlice.reducer;
