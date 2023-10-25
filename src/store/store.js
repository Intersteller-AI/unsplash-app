// @ts-nocheck
import { configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { userReducers } from "./reducers/user";

const userInfoFromCookie = Cookies.get("user")
  ? JSON.parse(Cookies.get("user"))
  : null;

const initialState = {
  user: {
    userInfo: userInfoFromCookie,
  },
};

const store = configureStore({
  reducer: {
    user: userReducers,
  },
  preloadedState: initialState,
});

export default store;
