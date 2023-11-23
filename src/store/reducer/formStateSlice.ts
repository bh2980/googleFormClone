import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum FORM_STATE {
  "edit",
  "viewer",
}

const initialState = { value: FORM_STATE.edit };

const formStateSlice = createSlice({
  name: "formState",
  initialState,
  reducers: {
    changeFormState(state, action: PayloadAction<FORM_STATE>) {
      state.value = action.payload;
    },
  },
});

export const { changeFormState } = formStateSlice.actions;

const formStateReducer = formStateSlice.reducer;
export default formStateReducer;
