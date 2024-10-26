import {createSlice} from '@reduxjs/toolkit';
import {Post} from '../../types';
import {createPost} from '../actions/postAction';

interface PostState {
  post: Post | null;
  loading: boolean;
  error: string | null;
}

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    loading: false,
    error: null,
  } as PostState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createPost.pending, state => {
      state.loading = true;
      state.post = null;
      state.error = null;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.post = action.payload.post;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.post = null;
      state.error = action.payload as string;
    });
  },
});

export default postSlice.reducer;
