import {configureStore, createSlice, createStore} from "@reduxjs/toolkit";
import {boardApi} from "../api/boardApi";
import {columnsApi} from "../api/columnApi";
import {taskApi} from "../api/taskApi";
import reduxStoreSlice from "./slices/ReduxStoreSlice";
import {loginApi} from "../api/loginApi";


export default configureStore({
    reducer: {
        [boardApi.reducerPath]: boardApi.reducer,
        [columnsApi.reducerPath]: columnsApi.reducer,
        [taskApi.reducerPath]: taskApi.reducer,
        reduxStoreSlice: reduxStoreSlice,
        [loginApi.reducerPath]: loginApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(boardApi.middleware, columnsApi.middleware, taskApi.middleware,loginApi.middleware),
});


