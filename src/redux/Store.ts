import { configureStore } from "@reduxjs/toolkit";
import { boardApi } from "../api/boardApi";

export default configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware),
});
