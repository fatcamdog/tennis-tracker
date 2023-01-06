import { configureStore } from '@reduxjs/toolkit';

import matchesReducer from './matches';
import authReducer from './auth';

// default redux toolkit store
const store = configureStore({
  reducer: {
    matches: matchesReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
