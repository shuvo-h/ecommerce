/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { salesApi } from "../../../redux/features/sales/salesApi";
import { PERIOD, TPeriod, TSaleSummary, salesGetters, setDateRange, setPeriod } from "../../../redux/features/sales/salesSlice";
import { useAppSelector } from "../../../redux/storeHook";
import SaleGraph, { graphRow } from "./SaleGraph";
import { DatePicker, Select, Space } from 'antd';
import dayjs from 'dayjs';
import SaleHistoryTable from "./SaleHistoryTable";

const { RangePicker } = DatePicker;

const periodOptions = [
    {
        value: PERIOD.DAILY,
        label: 'Daily',
    },
    {
        value: PERIOD.WEEKLY,
        label: 'Weekly',
    },
    {
        value: PERIOD.MONTHLY,
        label: 'Monthly',
    },
    {
        value: PERIOD.YEARLY,
        label: 'Yearly',
    }
]


function transformData(data:TSaleSummary[], period:TPeriod):graphRow[] {
    const transformedData = data?.map(item => {
        let name = '';
        if (period === PERIOD.DAILY) {
            name = `${item.day}/${item.month}/${item.year}`;
        } else if (period === PERIOD.WEEKLY) {
            name = `week ${item.week}/${item.year}`;
        } else if (period === PERIOD.MONTHLY) {
            name = `${item.month}/${item.year}`;
        } else if (period === PERIOD.YEARLY) {
            name = `${item.year}`;
        }
        
        return {
            name,
            totalCount: item.totalCount,
            totalAmount: item.totalAmount,
        };
    });

    return transformedData;
}


const SalesHistoryPage = () => {
    const dispatch= useDispatch();
  const query = useAppSelector(salesGetters.selectSaleQuery);
  const {
    data: saleOrders,
    isLoading,
  } = salesApi.useGetSalesQuery({ ...query });

  
 
  
  const onChange: any = (_date:any, dateString:[string,string]) => {
    const payload = {
        startDate: dateString[0],
        endDate: dateString[1],
    }  
    dispatch(setDateRange(payload));
};

const handlePeriodChange = (value: { value: TPeriod; label: React.ReactNode }) => {
    dispatch(setPeriod(value.value));
  };



  return <div>
    <div className="sm:flex justify-between mb-8">
        <div>
            <h2>Select Period</h2>
            <Select
            labelInValue
            defaultValue={periodOptions[0]}
            style={{ width: 120 }}
            onChange={handlePeriodChange}
            options={periodOptions}
        />
        </div>
        <div>
            <h2>Select Date range</h2>
            <Space direction="vertical" size={12}>
                <RangePicker onChange={onChange} defaultValue={[dayjs(query.startDate, 'YYYY-MM-DD'), dayjs(query.endDate, 'YYYY-MM-DD')]}  />
            </Space>
        </div>
    </div>
    <h1 className="block text-center my-8 font-bold text-2xl">Sales History</h1>
    {
        isLoading ?
        <></>
        : <SaleGraph data={transformData(saleOrders?.data,query.period)} />
    }
    <div>
        {
            isLoading ? <></> : <SaleHistoryTable salesData={saleOrders?.data} period={query.period} />
        } 
    </div>
  </div>;
};

export default SalesHistoryPage;
