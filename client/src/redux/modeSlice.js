import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideBar: true,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
  },
});

export const { setSideBar } = modeSlice.actions;

export default modeSlice.reducer;
