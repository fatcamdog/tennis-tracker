import { createSlice } from '@reduxjs/toolkit';

import { IUserState } from '../utils/interfaces';

// initial authstate set to null
const initialState: IUserState = {
  user: null,
};

// create a slice with two actions: login and logout
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
