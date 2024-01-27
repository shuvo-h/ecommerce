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

type TProductState = {
    products: TProduct[] | [];
    meta: {
        limit: number, 
        page: number, 
        total: number
    }
}

const initialState: TProductState = {
    products: [],
    meta: {
        limit: 10, 
        page: 1, 
        total: 2
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
    },
  });
  
  export const { setProducts,  } = productSlice.actions;
  export default productSlice.reducer;
  
  export const productGetters = {
    selectProductList: (state: RootState) => state.products.products,
  };
  