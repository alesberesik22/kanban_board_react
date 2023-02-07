import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Board } from "../interfaces/ApiTypes";

const url = "http://localhost:8080/board";

export const boardApi = createApi({
  reducerPath: "boardApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => "",
    }),
    getBoard: builder.query({
      query: (id: number) => `/${id}`,
    }),
    addBoard: builder.mutation({
      query: (board: Board) => ({
        url: "",
        body: board,
        method: "POST",
      }),
    }),
    updateBoard: builder.mutation({
      query: (board: Board) => ({
        url: "",
        body: board,
        method: "PUT",
      }),
    }),
    deleteBoard: builder.mutation({
      query: (id: number) => ({
        url: `?id=${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useAddBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;
