import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RespoonseInterface {
  questionID: string;
  content: string | number | number[] | null;
}

export type ResponseMap = {
  [key: string]: string | number | number[] | null;
};

const initialState: ResponseMap = {};

const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    editResponse(state, action: PayloadAction<RespoonseInterface>) {
      state[action.payload.questionID] = action.payload.content;
    },
  },
});

export const { editResponse } = responseSlice.actions;

const responseReducer = responseSlice.reducer;
export default responseReducer;
