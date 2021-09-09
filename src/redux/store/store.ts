import { configureStore } from "@reduxjs/toolkit";

import Reactotron from "~/ReactotronConfig";
import rootReducer from "~/redux/reducers";

/* eslint-disable  @typescript-eslint/no-non-null-assertion */
const reactotronEnhancer = Reactotron.createEnhancer!();

const store = configureStore({
  reducer: rootReducer,
  enhancers: [reactotronEnhancer]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
