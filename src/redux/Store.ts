import { configureStore } from "@reduxjs/toolkit";
import { boardApi } from "../api/boardApi";
import {columnsApi} from "../api/columnApi";

export default configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware,columnsApi.middleware),
});
