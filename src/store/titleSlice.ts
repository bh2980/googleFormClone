import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: "",
};

const titleSlice = createSlice({
  name: "title",
  initialState,
  reducers: {
    editTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    editContent(state, action: PayloadAction<string>) {
      state.content = action.payload;
    },
  },
});

export const { editTitle, editContent } = titleSlice.actions;

const titleReducer = titleSlice.reducer;
export default titleReducer;
