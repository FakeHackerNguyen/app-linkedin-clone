import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseUrlApi} from '../../api/baseUrlApi';

export const createPost = createAsyncThunk(
  'post/create',
  async (credentials: {formData: FormData; accessToken: string}, thunkAPI) => {
    try {
      const res = await fetch(`${baseUrlApi}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${credentials.accessToken}`,
        },
        body: credentials.formData,
      });

      const data = await res.json();

      console.log(data);

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
