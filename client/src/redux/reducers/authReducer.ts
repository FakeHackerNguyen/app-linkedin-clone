import {createSlice} from '@reduxjs/toolkit';
import {login} from '../actions/authAction';

interface AuthState {
  accessToken: string | null;
  accessTokenUpdateAt?: string | null;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    location: string;
    about: string;
    cover: {
      url: string;
      public_id: string;
    };
    avatar: {
      url: string;
      public_id: string;
    };
  } | null;
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
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.accessTokenUpdateAt = null;
      state.error = action.payload as string;
    });
  },
});

export default authSlice.reducer;
