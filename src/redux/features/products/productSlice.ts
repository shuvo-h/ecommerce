import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TQuary = {
  minPrice?: number;
  maxPrice?: number;
  releaseDate?: string;
  brand?: string;
  model?: string;
  category?: string;
  connectivity?: string;
  powerSource?: string;
  cameraResolution?: string;
  storageCapacity?: string;
  screenSize?: string;
  operatingSystem?: string;
}

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
    img: string;
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
    meta: TProductMeta;
    query: TQuary;
}

const initialState: TProductState = {
    products: [],
    meta: {
        limit: 5, 
        page: 1, 
        total: 0
    },
    query:{
      minPrice: undefined,
      maxPrice: undefined,
      releaseDate: undefined,
      brand: undefined,
      model: undefined,
      category: undefined,
      connectivity: undefined,
      powerSource: undefined,
      cameraResolution: undefined,
      storageCapacity: undefined,
      screenSize: undefined,
      operatingSystem: undefined
    },
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
      setQuery: (state,action) =>{
        const {key,value} = action.payload;
        const filteredValue = value === 'All' ? undefined : value;
        state.query = {...state.query,[key]:filteredValue};
      },
      setPriceQuery: (state,action) =>{
        const {minPrice,maxPrice} = action.payload;
        state.query = {...state.query,minPrice,maxPrice};
      },
    },
  });
  
  export const { setProducts,setProductLimitPerPage, setProductPageNumber,setQuery,setPriceQuery } = productSlice.actions;
  export default productSlice.reducer;
  
  export const productGetters = {
    selectProductList: (state: RootState) => state.products.products,
    selectProductMeta: (state: RootState) => state.products.meta,
    selectProductQuery: (state: RootState) => state.products.query,
  };
  