import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthInterface, SLICE_NAME } from "~/redux/types/auth.types";

const INITIAL_MAINTENANCE_MODE_STATE: AuthInterface = {
  isLoading: true,
  isSignout: false,
  needsVerfication: false,
  userToken: null,
  refreshToken: null,
  isUnderMaintainance: false,
  isUnderForceUpgrade: false,
  user: undefined
};

export const authSlice = createSlice({
  name: SLICE_NAME,
  initialState: INITIAL_MAINTENANCE_MODE_STATE,
  reducers: {
    setMaintenanceMode: (state, action: PayloadAction<AuthInterface>) => {
      state.isUnderMaintainance = action.payload.isUnderMaintainance;
    },
    setUser: (state, action: PayloadAction<AuthInterface>) => {
      state.user = action.payload.user;
      state.userToken = action.payload.userToken;
      state.refreshToken = action.payload.refreshToken;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setMaintenanceMode, setUser } = authSlice.actions;

export default authSlice.reducer;
