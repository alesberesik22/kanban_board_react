import { configureStore } from "@reduxjs/toolkit";
import { boardApi } from "../api/boardApi";
import {columnsApi} from "../api/columnApi";
import {taskApi} from "../api/taskApi";

export default configureStore({
  reducer: {
    [boardApi.reducerPath]: boardApi.reducer,
    [columnsApi.reducerPath]: columnsApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(boardApi.middleware,columnsApi.middleware,taskApi.middleware),
});
