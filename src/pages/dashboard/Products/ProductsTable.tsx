import { Space, Table,  } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";
import { TProduct, TProductMeta, setProductLimitPerPage, setProductPageNumber } from "../../../redux/features/products/productSlice";
import { parseDate } from "../../../utilies/dateTimeUtils";
import { useAppDispatch } from "../../../redux/storeHook";
import { productsApi } from "../../../redux/features/products/productsApi";
import { toast } from "sonner";

interface TProductCol extends TProduct {
  key: React.Key;
}

type TProductsTableProps = {
  data: TProduct[];
  meta: TProductMeta;
  isLoading: boolean;
  onClickEditProduct: (product:TProduct)=>void;
  onClickDuplicateProduct: (product:TProduct)=>void;
  onClickSale: (product:string)=>void;
};
const ProductsTable = ({ data,meta,isLoading,onClickSale,onClickDuplicateProduct,onClickEditProduct }: TProductsTableProps) => {
    const dispatch = useAppDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [deleteProductMutation,] = productsApi.useDeleteProductByIdMutation()
 
  // methods
  const onDeleteClick = async(productId:string) =>{
    const toastId = toast.loading('deleting a product');
    try {
      
      const res = await deleteProductMutation(productId);
      if ('data' in res) {
        const data = res.data;
        if (data.success) {
            toast.success("Product deleted successfully", { id: toastId, duration: 2000 });
        } else {
            toast.error(data.message || "Failed to delete product", { id: toastId, duration: 2000 });
        }
    } else {
        // Handle error response
        toast.error('Failed to delete product', { id: toastId, duration: 2000 });
    }
    } catch (error) {
      console.log(error);
      
      toast.error('Failed to delete product',{id:toastId,duration:2000})
    }
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    };

    // computed
    const formatTableData = (rawData: TProduct[]) => {
        const newList = rawData.map((product) => {
            return { ...product, key: product._id };
        });
        return newList;
    };

    
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
    responsive: ['xl']
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
    render: (value) => <span>{value}</span>,
    responsive: ['md']
  },
  {
    title: "Model",
    dataIndex: "model",
    key: "model",
    render: (value) => <span>{value}</span>,
    responsive: ['xl']
  },
  {
    title: "category",
    dataIndex: "category",
    key: "category",
    render: (value) => <span>{value}</span>,
    responsive: ['xl']
  },
  {
    title: "Operating System",
    dataIndex: "operatingSystem",
    key: "operatingSystem",
    render: (value) => <span>{value}</span>,
    responsive: ['xl']
  },
  {
    title: "Connectivity",
    dataIndex: "connectivity",
    key: "connectivity",
    render: (value) => <span>{value}</span>,
    responsive: ['xxl']
  },
  {
    title: "Power Source",
    dataIndex: "powerSource",
    key: "powerSource",
    render: (value) => <span>{value}</span>,
    responsive: ['xxl']
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
    responsive: ['xxl']
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
    responsive: ['xxl']
  },
  {
    title: "Weight",
    dataIndex: "weight",
    key: "weight",
    render: (value) => {
      return <span>{value}</span>;
    },
    responsive: ['xxl']
  },
  {
    title: "Action",
    width: 150,
    fixed: "right",
    render: (value) => {
      return <Space className="flex flex-col">
        {/* <Typography.Link>Edit</Typography.Link> */}
        {/* <Typography.Link>Delete</Typography.Link> */}
        <button className="border px-1 rounded-md" onClick={()=>{onClickSale(value._id)}}>Sell</button>
        <button className="border px-1 rounded-md" onClick={()=>{onClickDuplicateProduct(value);}}>Edit & Duplicate</button>
        <button className="border px-1 rounded-md" onClick={()=>{onClickEditProduct(value);}}>Edit</button>
        <button className="border px-1 rounded-md"  onClick={()=>{onDeleteClick(value._id)}}>Delete</button>
      </Space>
    },
  },
];


    const paginationConfig = {
        pageSize: meta?.limit || 10, 
        total: meta?.total || 0, 
        showSizeChanger: true, 
        showQuickJumper: true, 
        showTotal: (total:number, range:number[]) => `${range[0]}-${range[1]} of ${total} items`, // Display total items
        current: meta?.page || 1,
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange: (page:number, _pageSize:number) => {
        //   productsApi.useGetProductsQuery({ page: page, limit: pageSize });
            dispatch(setProductPageNumber(page))
        },
        onShowSizeChange: (_current:number, size:number) => {
            dispatch(setProductPageNumber(1))
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
