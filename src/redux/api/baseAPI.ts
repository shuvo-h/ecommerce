import { BaseQueryApi, BaseQueryFn, DefinitionType, FetchArgs, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseUrl = `http://localhost:5000/api/v1`;

const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials:"include",
    prepareHeaders: (headers,api)=>{
        const {getState} = api;
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization',`${token}`);
        }
        return headers;
    },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs,BaseQueryApi,DefinitionType> = async(args,api,extraOptions):Promise<any> =>{
    let result = await baseQuery(args,api,extraOptions);
    if (result.error?.status === 401) {
        const response = await fetch(`/auth/refresh-token`,{
            method:"POST",
            credentials:"include",
        }).then(res=>res.json())

        // logout if refreshToken expire
        if (response.data?.accessToken) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setUser({user,token: response.data.accessToken }))
            
            result = await baseQuery(args,api,extraOptions)
        }else{
            api.dispatch(logout());
        }
    }
    return result;
}

export const baseAPI = createApi({
    reducerPath:"baseApi",
    baseQuery:baseQueryWithRefreshToken,
    endpoints:()=>({}),
})