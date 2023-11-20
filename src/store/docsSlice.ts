import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface initialStateType {
  title: string;
  content: string;
  blockIDList: string[];
}

const initialState: initialStateType = {
  title: "",
  content: "",
  blockIDList: [],
};

const docsSlice = createSlice({
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

export const { editTitle, editContent } = docsSlice.actions;

const docsReducer = docsSlice.reducer;
export default docsReducer;
