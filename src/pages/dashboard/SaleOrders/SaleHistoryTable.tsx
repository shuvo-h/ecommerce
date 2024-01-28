
import Table, { ColumnsType } from "antd/es/table";
import { TProduct } from "../../../redux/features/products/productSlice";
import { PERIOD, TPeriod } from "../../../redux/features/sales/salesSlice";

interface SaleDataType {
  _id: string;
  product: string;
  productDetails: TProduct;
  seller: string;
  quantity: number;
  buyerName: string;
  soldDate: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface SaleHistoryTableProps {
  salesData: {
    totalCount: number;
    totalAmount: number;
    data: SaleDataType[];
    year: number;
    month: number;
    week: number;
    day: number;
  }[];
  period: TPeriod;
}

const SaleHistoryTable= ({  salesData,  period,}:SaleHistoryTableProps) => {
  const expandedRowRender = (data: SaleDataType[]) => {
    const columns: ColumnsType<SaleDataType> = [
      { title: "Product", dataIndex: "product", key: "product" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      { title: "Buyer Name", dataIndex: "buyerName", key: "buyerName" },
      { title: "Sold Date", dataIndex: "soldDate", key: "soldDate" },
      { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
    ];

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  function filterColumnsByPeriod(period: TPeriod) {
    const filteredColumns = [
      { title: "Total Count", dataIndex: "totalCount", key: "totalCount" },
      { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
    ];

    const yearly = { title: "Year", dataIndex: "year", key: "year" };
    const monthly = { title: "Month", dataIndex: "month", key: "month" };
    const weekly = { title: "Week", dataIndex: "week", key: "week" };
    const daily = { title: "Day", dataIndex: "day", key: "day" };

    if (period === PERIOD.YEARLY) {
      filteredColumns.push(yearly);
    } else if (period === PERIOD.MONTHLY) {
      filteredColumns.push(yearly, monthly);
    } else if (period === PERIOD.WEEKLY) {
      filteredColumns.push(yearly, weekly);
    } else if (period === PERIOD.DAILY) {
      filteredColumns.push(yearly, monthly, daily);
    }

    return filteredColumns;
  }

  const formattedData = salesData.map((sale, index) => {
    return {
      ...sale,
      key: index.toString(),
      data: sale.data.map((product) => {
        return { ...product, product: product?.productDetails?.name };
      }),
    };
  });

  return (
    <>
      <Table
        columns={filterColumnsByPeriod(period)}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record.data),
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={formattedData}
      />
    </>
  );
};

export default SaleHistoryTable;
