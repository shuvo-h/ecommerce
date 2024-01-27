import { Space, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { TProduct, TProductMeta, setProductLimitPerPage, setProductPageNumber } from "../../../redux/features/products/productSlice";
import { parseDate } from "../../../utilies/dateTimeUtils";
import { useAppDispatch } from "../../../redux/storeHook";

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
  meta: TProductMeta;
  isLoading: boolean;
};
const ProductsTable = ({ data,meta,isLoading }: TProductsTableProps) => {
    const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
 
  // methods
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log("selectedRowKeys changed: ", newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
    };

    // computed
    const formatTableData = (rawData: TProduct[]) => {
        const newList = rawData.map((product) => {
            return { ...product, key: product._id };
        });
        return newList;
    };

    const paginationConfig = {
        pageSize: meta?.limit || 10, 
        total: meta?.total || 0, 
        showSizeChanger: true, 
        showQuickJumper: true, 
        showTotal: (total:number, range:number[]) => `${range[0]}-${range[1]} of ${total} items`, // Display total items
        current: meta?.page || 1,
        onChange: (page:number, pageSize:number) => {
          console.log('Page:', page, 'Page Size:', pageSize);
        //   productsApi.useGetProductsQuery({ page: page, limit: pageSize });
            dispatch(setProductPageNumber(page))
        },
        onShowSizeChange: (current:number, size:number) => {
            console.log('Current Page:', current, 'Page Size:', size);
            dispatch(setProductLimitPerPage(size))
         
        },
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
        pagination={paginationConfig}
      />
    </div>
  );
};

export default ProductsTable;
