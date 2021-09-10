import authReducer from "./auth.reducer";
import pagesReducer from "./pages.reducer";
import pagesObjReducer from "./pagesObj.reducer";
import settingsReducer from "./settings.reducer";

const allReducers = {
  auth: authReducer,
  pages: pagesReducer,
  settings: settingsReducer,
  pagesObj: pagesObjReducer,
};
const rootReducer = allReducers;

export default rootReducer;
