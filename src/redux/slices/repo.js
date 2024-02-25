import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRepos = createAsyncThunk(`fetchRepos`, async (page) => {
  try {
    console.log("page",page);
    const res = await axios.get(
      `https://api.github.com/search/repositories?q=created:>2024-02-15&sort=stars&order=desc&page=${page}`
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});


const repoSlice = createSlice({
  name: "repo",
  initialState: {
    loading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRepos.fulfilled, (state, action) => {
      state.loading = false;
    //   console.log("payload", action);
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchRepos.rejected, (state, action) => {
      console.log("error", action.payload);

      state.data = [];
      state.isError = true;
    });
  },
});

export default repoSlice.reducer;
