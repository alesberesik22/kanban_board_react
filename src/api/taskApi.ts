import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {Task} from "../interfaces/ApiTypes";

const url = "http://localhost:8080/task";

export const taskApi = createApi({
    reducerPath:'taskApi',
    baseQuery:fetchBaseQuery({baseUrl:url}),
    endpoints:(builder) => ({
        addTask: builder.mutation({
            query:(task:Task) => ({
                url:"",
                body:task,
                method:'POST'
            })
        })
    })
})

export const {useAddTaskMutation} = taskApi
