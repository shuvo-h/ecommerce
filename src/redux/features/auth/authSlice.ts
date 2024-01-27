import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TUser_Role } from "./authConstant";

export type TUser = {
  _id: string;
  email: string;
  role: TUser_Role;
  status: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const authGetters = {
  selectCurrentToken: (state: RootState) => state.auth.token,
  selectCurrentUser: (state: RootState) => state.auth.user,
};
