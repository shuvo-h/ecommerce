import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TSaleSummary {
  totalCount: number;
  totalAmount: number;
  data: TSale[];
  year: number;
  month: number;
  week: number;
  day: number;
}


export interface TSale {
    product: string;
    seller: string;
    quantity: number;
    buyerName: string;
    soldDate: string;
    totalAmount: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export type TSaleMeta =  {
    limit: number, 
    page: number, 
    total: number
}
export const PERIOD = {
  DAILY : "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "year",
} as const;
export type TPeriod = typeof PERIOD[keyof typeof PERIOD];

type TSaleState = {
    salesQuery:{
      startDate: string;
      endDate: string;
      period: TPeriod;
    }
}

const currentDate = new Date();
const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();


const initialState: TSaleState = {
    salesQuery:{
      startDate: startOfMonth,
      endDate: endOfMonth,
      period: PERIOD.DAILY,
    }
}


const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
      setDateRange: (state, action) => {
        const {startDate,endDate} = action.payload;
        state.salesQuery.startDate = startDate;
        state.salesQuery.endDate = endDate;
      },
      setPeriod: (state, action) => {
        const period = action.payload;
        state.salesQuery.period = period;
      },
    },
  });
  
  export const {setDateRange, setPeriod } = salesSlice.actions;
  export default salesSlice.reducer;
  
  export const salesGetters = {
    selectSaleQuery: (state: RootState) => state.sales.salesQuery,
    // selectSalesMeta: (state: RootState) => state.sales.meta,
  };
  