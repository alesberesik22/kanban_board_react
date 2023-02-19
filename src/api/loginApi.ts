import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const url = 'https://kodiva-apps-be.herokuapp.com'

interface user {
    userName:string,
    password:string
}

export const loginApi = createApi({
    reducerPath:'loginApi',
    baseQuery:fetchBaseQuery({baseUrl:url}),
    endpoints:(builder) => ({
        login: builder.mutation({
            query:(user:user) => ({
                url:"/public/token",
                headers:{
                    username:user.userName,
                    password:user.password,
                },
                method:'GET',
                responseHandler: (response:{text:()=>any}) => response.text()
            })
        })
    })
})

export const {useLoginMutation} = loginApi;