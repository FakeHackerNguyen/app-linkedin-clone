import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';
import searchReducer from './reducers/searchReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    search: searchReducer,
  },
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
