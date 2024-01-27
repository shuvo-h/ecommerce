import { baseAPI } from "../../api/baseAPI";

export const productsApi = baseAPI.injectEndpoints({
    endpoints: (builder) =>({
        getProducts: builder.query({
            query: (searchQuery) =>{
                console.log({searchQuery});
                
                return {
                    url: `/products/?page=1&search=computer&limit=10`,
                    method: "GET",
                }
            },
        }),
        
    })
})