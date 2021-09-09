import authReducer from "./auth.reducer";
import settingsReducer from "./settings.reducer";

const allReducers = {
  auth: authReducer,
  settings: settingsReducer
};
const rootReducer = allReducers;

export default rootReducer;
