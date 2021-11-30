import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import shoppingReducer from "./shopping";

const rootReducer = {
  shoppingState: shoppingReducer,
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
