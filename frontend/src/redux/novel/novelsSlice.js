import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  novels: [],
  loading: false,
  error: null,
};

const novelsSlice = createSlice({
  name: "novels",
  initialState,
  reducers: {
    fetchNovelsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNovelsSuccess: (state, action) => {
      state.novels = action.payload;
      state.loading = false;
    },
    fetchNovelsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addNovelStart: (state) => {
      state.loading = true;
    },
    addNovelSuccess: (state, action) => {
      state.novels.push(action.payload);
      state.loading = false;
    },
    addNovelFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateNovelStart: (state) => {
      state.loading = true;
    },
    updateNovelSuccess: (state, action) => {
      const index = state.novels.findIndex(novel => novel.id === action.payload.id);
      if (index !== -1) {
        state.novels[index] = action.payload;
      }
      state.loading = false;
    },
    updateNovelFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteNovelStart: (state) => {
      state.loading = true;
    },
    deleteNovelSuccess: (state, action) => {
      state.novels = state.novels.filter(novel => novel.id !== action.payload);
      state.loading = false;
    },
    deleteNovelFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchNovelsStart,
  fetchNovelsSuccess,
  fetchNovelsFailure,
  addNovelStart,
  addNovelSuccess,
  addNovelFailure,
  updateNovelStart,
  updateNovelSuccess,
  updateNovelFailure,
  deleteNovelStart,
  deleteNovelSuccess,
  deleteNovelFailure,
} = novelsSlice.actions;

export default novelsSlice.reducer;