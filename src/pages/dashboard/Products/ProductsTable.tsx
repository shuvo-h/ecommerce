import { Space, Table, Tooltip, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { TProduct } from "../../../redux/features/products/productSlice";
import { parseDate } from "../../../utilies/dateTimeUtils";

interface TProductCol extends TProduct {
  key: React.Key;
}

const columns: TableColumnsType<TProductCol> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    width: 150,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 80,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "Release Date",
    dataIndex: "releaseDate",
    key: "releaseDate",
    render: (value) => <span>{parseDate(value)}</span>,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "category",
    dataIndex: "category",
    key: "category",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "Operating System",
    dataIndex: "operatingSystem",
    key: "operatingSystem",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "Connectivity",
    dataIndex: "connectivity",
    key: "connectivity",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "Power Source",
    dataIndex: "powerSource",
    key: "powerSource",
    render: (value) => <span>{value}</span>,
  },
  {
    title: "Features",
    dataIndex: "features",
    key: "features",
    render: (value) => {
          
        const filteredValue = value && value._id ? { ...value } : value;
        
        if (filteredValue && filteredValue._id) {
            delete filteredValue._id;
        }

      return <span className="capitalize">
            {
                filteredValue && Object.entries(filteredValue).map(([key,valueData],idx)=><p key={idx}>{key} = {`${valueData}`}</p>)
            }
        </span>;
    },
  },
  {
    title: "Dimension",
    dataIndex: "dimension",
    key: "dimension",
    render: (value) => {
        const filteredValue = value && value._id ? { ...value } : value;
        
        if (filteredValue && filteredValue._id) {
            delete filteredValue._id;
        }
        return <span className="capitalize">
            {
                filteredValue && Object.entries(filteredValue).map(([key,valueData],idx)=><p key={idx}>{key} = {`${valueData}`}</p>)
            }
        </span>;
    },
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
    render: (value) => {
      return <span>{value}</span>;
    },
  },
  {
    title: "Action",
    width: 150,
    fixed: "right",
    render: () => (
      <Space>
        <Typography.Link>Edit</Typography.Link>
        <Typography.Link>Delete</Typography.Link>
      </Space>
    ),
  },
];

type TProductsTableProps = {
  data: TProduct[];
  isLoading: boolean;
};
const ProductsTable = ({ data,isLoading }: TProductsTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const formatTableData = (rawData: TProduct[]) => {
    const newList = rawData.map((product) => {
      return { ...product, key: product._id };
    });
    return newList;
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={formatTableData(data)}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          type: "checkbox",
          // columnWidth: 48,
        }}
        loading={isLoading}
      />
    </div>
  );
};

export default ProductsTable;
