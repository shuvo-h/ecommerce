import { baseAPI } from "../../api/baseAPI";

export const productsApi = baseAPI.injectEndpoints({
    endpoints: (builder) =>({
        getProducts: builder.query({
            query: (searchQuery) =>{
                console.log({searchQuery});
                let queryString:string = ''
                if (searchQuery) {
                    queryString = `?${new URLSearchParams(searchQuery).toString()}`
                }
                return {
                    url: `/products/${queryString}`,
                    method: "GET",
                }
            },
        }),
        
    })
})