import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PagesObjInterface, SLICE_NAME } from "~/redux/types/pagesObj.types";

const INITIAL_PAGES_STATE: PagesObjInterface = {
  pageOne: {},
  pageTwo: {},
};

export const pagesSlice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_PAGES_STATE,
  reducers: {
    setPagesObj: (state, action: PayloadAction<PagesObjInterface>) => {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

// Action creators are generated for each case reducer function
export const { setPagesObj } = pagesSlice.actions;

export default pagesSlice.reducer;
