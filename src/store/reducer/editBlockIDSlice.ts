import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface editBlockID {
  editBlockID: string;
}

const initialState: editBlockID = {
  editBlockID: "",
};

const editBlockIDSlice = createSlice({
  name: "editBlockID",
  initialState,
  reducers: {
    changeEditBlockID(state, action: PayloadAction<string>) {
      state.editBlockID = action.payload;
    },
  },
});

export const { changeEditBlockID } = editBlockIDSlice.actions;

const editBlockIDReducer = editBlockIDSlice.reducer;
export default editBlockIDReducer;
