import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DocsInterface {
  title: string;
  content: string;
  blockIDList: string[];
}

const initialState: DocsInterface = {
  title: "",
  content: "",
  blockIDList: [],
};

const docsSlice = createSlice({
  name: "docs",
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
