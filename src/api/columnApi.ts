import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Column} from "../interfaces/ApiTypes";

const url = "http://localhost:8080/columns";

export const columnsApi = createApi({
    reducerPath:'columnsApi',
    baseQuery: fetchBaseQuery({baseUrl:url}),
    endpoints:(build) => ({
        addColumn: build.mutation({
            query: (column: Column) => ({
                url: "",
                body: column,
                method: "POST",
            }),
        }),
    })
})

export const {useAddColumnMutation} = columnsApi;
