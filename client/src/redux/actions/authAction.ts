import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrlApi} from '../../api/baseUrlApi';

export const login = createAsyncThunk(
  'auth/login',
  async (
    credentials: {
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(`${baseUrlApi}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (data.message) {
        throw new Error(data.message);
      }

      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);

export const isAuth = createAsyncThunk(
  'auth/is-auth',
  async (
    credentials: {
      accessToken: string;
    },
    thunkAPI,
  ) => {
    try {
      const res = await fetch(`${baseUrlApi}/auths`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.accessToken}`,
        },
      });

      const data = await res.json();

      if (data.message) {
        throw new Error(data.message);
      }

      return data.data;
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }

      return thunkAPI.rejectWithValue('An unknown error occurred');
    }
  },
);
