import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Column} from "../interfaces/ApiTypes";

const url = "http://localhost:8080/columns";

export const columnsApi = createApi({
    reducerPath: 'columnsApi',
    baseQuery: fetchBaseQuery({baseUrl: url}),
    endpoints: (build) => ({
        addColumn: build.mutation({
            query: (column: Column) => ({
                url: "",
                body: column,
                method: "POST",
            }),
        }),
        deleteColumn: build.mutation({
            query: (id: number) => ({
                url: `?id=${id}`,
                method: "DELETE",
            })
        }),
        updateColumn:build.mutation({
            query:(column:Column) => ({
                url:``,
                body:column,
                method:'PUT'
            })
        })
    })
})

export const {useAddColumnMutation,useDeleteColumnMutation,useUpdateColumnMutation} = columnsApi;
