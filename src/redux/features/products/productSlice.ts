import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    cart: TCart;
}
export type TCartProductList = {
  product: string
  quantity: number
}

export type TCart = {
  productList: TCartProductList[]
  buyerName: string
  contactNumber: string
  soldDate: string
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
    cart:{
      productList: [],
      buyerName: "",
      contactNumber: "",
      soldDate: "",
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
      addToCart: (state,action:PayloadAction<{productId:string,quantity:number}>) =>{
        const {productId,quantity} = action.payload;
        state.cart.productList.push({product:productId,quantity})
      },
      removeFromCart: (state,action) =>{
        const productId = action.payload;
        state.cart.productList = state.cart.productList.filter(item => item.product !== productId);
      },
      clearCart: (state) =>{
        state.cart = {
          productList: [],
          buyerName: "",
          contactNumber: "",
          soldDate: "",
        }
      },
      updateQuantityInCart: (state,action:PayloadAction<{productId:string,quantity:number}>) =>{
        const {productId,quantity} = action.payload;
        const productIndex = state.cart.productList.findIndex(el=>el.product === productId);
        if (productIndex > -1) {
          const updatedList = [...state.cart.productList];
          updatedList[productIndex] = {
            ...updatedList[productIndex],
            quantity,
          };
          state.cart.productList = updatedList;
        }
        // state.cart.productList = state.cart.productList.filter(item => item.product !== productId);
      },

    },
  });
  
  export const { setProducts,setProductLimitPerPage, setProductPageNumber,setQuery,setPriceQuery,addToCart,removeFromCart,updateQuantityInCart,clearCart } = productSlice.actions;
  export default productSlice.reducer;
  
  export const productGetters = {
    selectProductList: (state: RootState) => state.products.products,
    selectProductMeta: (state: RootState) => state.products.meta,
    selectProductQuery: (state: RootState) => state.products.query,
    selectCart: (state: RootState) => state.products.cart,
  };
  