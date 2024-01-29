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

interface DeleteProductRes {
    success: boolean;
    message: string;
    data: null;
    errorSources: ErrorSource[];
}

interface ErrorSource {
    path: string;
    message: string;
}



export const productsApi = baseAPI.injectEndpoints({
    endpoints: (builder) =>({
        // get product list
        getProducts: builder.query({
            query: (searchQuery) =>{
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
            invalidatesTags: ['products','products-options'],
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
            invalidatesTags: ['products','products-options'],
        }),
        // delete existing product by id
        deleteProductById: builder.mutation<DeleteProductRes,string>({
            query: (productId:string) =>{
                return {
                    url:`/products/product/${productId}`,
                    method:"DELETE",
                }
            },
            invalidatesTags: ['products'],
        }),
        // delete existing product list by ids
        deleteProductsByIds: builder.mutation<DeleteProductRes,string[]>({
            query: (productIds:string[]) =>{
                return {
                    url:`/products`,
                    method:"DELETE",
                    body: {productIds}
                }
            },
            invalidatesTags: ['products'],
        }),


        // get product filter options list
        getProductFilterOptions: builder.query({
            query: () =>{
                
                return {
                    url: `/products/product/filter-options`,
                    method: "GET",
                }
            },
            providesTags:['products-options'],
        }),
        
    })
})