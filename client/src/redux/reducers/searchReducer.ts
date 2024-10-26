import {createSlice} from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  isSearchFocus: boolean;
}

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    isSearchFocus: false,
  } as SearchState,
  reducers: {
    focusSearch: (state, action) => {
      state.isSearchFocus = action.payload;
    },
    changeQuerySearch: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const {focusSearch, changeQuerySearch} = searchSlice.actions;
export default searchSlice.reducer;
