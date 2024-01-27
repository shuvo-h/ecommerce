import { baseAPI } from "../../api/baseAPI";
import { TProduct } from "./productSlice";

type TAddProductRes = {
    data: {
        success: boolean,
        message: string,
        data: TProduct,
    },

};

type TProductEditInfo = {
    productId: string;
    product: Partial<TProduct>,

}

type TUpdateProductRes = TAddProductRes;

export const productsApi = baseAPI.injectEndpoints({
    endpoints: (builder) =>({
        // get product list
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
            providesTags:['products'],
        }),

        // add a new product
        addProduct: builder.mutation<TAddProductRes,TProduct>({
            query: (bodyData) =>{
                return {
                    url:"/products/product",
                    method:"POST",
                    body: bodyData
                }
            },
            invalidatesTags: ['products'],
        }),

        // Edit existing product
        editProductById: builder.mutation<TUpdateProductRes,TProductEditInfo>({
            query: (editInfo) =>{
                const {productId,product} = editInfo;
                return {
                    url:`/products/product/${productId}`,
                    method:"PATCH",
                    body: product
                }
            },
            invalidatesTags: ['products'],
        }),
        
    })
})