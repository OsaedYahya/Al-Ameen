import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PagesInterface, SLICE_NAME } from "~/redux/types/pages.types";

const INITIAL_PAGES_STATE: PagesInterface = {
  pageOne: 0,
  pageTwo: 0,
  pageThree: 0,
};

export const pagesSlice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_PAGES_STATE,
  reducers: {
    setPages: (state, action: PayloadAction<PagesInterface>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPages } = pagesSlice.actions;

export default pagesSlice.reducer;
