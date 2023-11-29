import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PositionInterface {
  top: number;
  left: number;
}

const initialState: PositionInterface = {
  top: 0,
  left: 0,
};

const sidebarPositionSlice = createSlice({
  name: "sidebarPosition",
  initialState,
  reducers: {
    changeSidebarPosition(state, action: PayloadAction<PositionInterface>) {
      state.top = action.payload.top;
      state.left = action.payload.left;
    },
  },
});

export const { changeSidebarPosition } = sidebarPositionSlice.actions;

const sidebarPositionReducer = sidebarPositionSlice.reducer;
export default sidebarPositionReducer;
