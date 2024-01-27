import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TProduct  {
    _id: string;
    user_id: string;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    isAvailable: boolean;
    releaseDate: string;
    brand: string;
    model: string;
    category: string;
    operatingSystem: string;
    connectivity: string;
    powerSource: string;
    features: {
        cameraResolution: string;
        storageCapacity: string;
        screenSize: string;
    };
    dimension: {
        height: number;
        width: number;
        depth: number;
    };
    weight: string;
    createdAt: Date;
    updatedAt: Date;
}
export type TProductMeta =  {
    limit: number, 
    page: number, 
    total: number
}
type TProductState = {
    products: TProduct[] | [];
    meta: TProductMeta
}

const initialState: TProductState = {
    products: [],
    meta: {
        limit: 5, 
        page: 1, 
        total: 0
    }
}


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setProducts: (state, action) => {
        const products = action.payload;
        state.products = products;
      },
      setProductPageNumber: (state, action) => {
        state.meta.page = action.payload;
      },
      setProductLimitPerPage: (state, action) => {
        state.meta.limit = action.payload;
      },
      
    },
  });
  
  export const { setProducts,setProductLimitPerPage, setProductPageNumber } = productSlice.actions;
  export default productSlice.reducer;
  
  export const productGetters = {
    selectProductList: (state: RootState) => state.products.products,
    selectProductMeta: (state: RootState) => state.products.meta,
  };
  