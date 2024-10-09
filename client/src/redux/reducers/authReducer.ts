import {createSlice} from '@reduxjs/toolkit';
import {isAuth, login} from '../actions/authAction';
import {User} from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  accessToken: string | null;
  accessTokenUpdateAt?: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    accessTokenUpdateAt: null,
    user: null,
    loading: false,
    error: null,
  } as AuthState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.accessToken = null;
      state.accessTokenUpdateAt = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.accessTokenUpdateAt = action.payload.accessTokenUpdateAt;

      AsyncStorage.setItem('accessToken', action.payload.accessToken);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.accessTokenUpdateAt = null;
      state.error = action.payload as string;
    });
    builder.addCase(isAuth.pending, state => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.accessToken = null;
    });
    builder.addCase(isAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(isAuth.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
