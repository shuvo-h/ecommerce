import { Space, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  TProduct,
  TProductMeta,
  setProductLimitPerPage,
  setProductPageNumber,
} from "../../../redux/features/products/productSlice";
import { parseDate } from "../../../utilies/dateTimeUtils";
import { useAppDispatch } from "../../../redux/storeHook";
import { productsApi } from "../../../redux/features/products/productsApi";
import { toast } from "sonner";
import { CopyOutlined, DeleteFilled, DeleteOutlined, EditOutlined, ShoppingCartOutlined, ShoppingFilled, ShoppingTwoTone } from "@ant-design/icons";

interface TProductCol extends TProduct {
  key: React.Key;
}

type TProductsTableProps = {
  data: TProduct[];
  meta: TProductMeta;
  isLoading: boolean;
  onClickEditProduct: (product: TProduct) => void;
  onClickDuplicateProduct: (product: TProduct) => void;
  onClickSale: (product: string) => void;
  selectedRowKeys:React.Key[];
  setSelectedRowKeys:React.Dispatch<React.SetStateAction<React.Key[]>>
};
const ProductsTable = ({
  data,
  meta,
  isLoading,
  onClickSale,
  onClickDuplicateProduct,
  onClickEditProduct,
  selectedRowKeys,
  setSelectedRowKeys,
}: TProductsTableProps) => {
  const dispatch = useAppDispatch();
  
  const [deleteProductMutation] = productsApi.useDeleteProductByIdMutation();
console.log(selectedRowKeys);

  // methods
  const onDeleteClick = async (productId: string) => {
    const toastId = toast.loading("deleting a product");
    try {
      const res = await deleteProductMutation(productId);
      if ("data" in res) {
        const data = res.data;
        if (data.success) {
          toast.success("Product deleted successfully", {
            id: toastId,
            duration: 2000,
          });
        } else {
          toast.error(data.message || "Failed to delete product", {
            id: toastId,
            duration: 2000,
          });
        }
      } else {
        // Handle error response
        toast.error("Failed to delete product", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete product", { id: toastId, duration: 2000 });
    }
  };
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
      width: 200,
      fixed: "left"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
      // responsive: ["xl"],
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (value) => <span>{value}</span>,
      // responsive: ["md"],
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (value) => <span>{value}</span>,
      // responsive: ["xl"],
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      render: (value) => <span>{value}</span>,
      // responsive: ["xl"],
    },
    {
      title: "Operating System",
      dataIndex: "operatingSystem",
      key: "operatingSystem",
      render: (value) => <span>{value}</span>,
      // responsive: ["xl"],
    },
    {
      title: "Connectivity",
      dataIndex: "connectivity",
      key: "connectivity",
      render: (value) => <span>{value}</span>,
      // responsive: ["xxl"],
    },
    {
      title: "Power Source",
      dataIndex: "powerSource",
      key: "powerSource",
      render: (value) => <span>{value}</span>,
      // responsive: ["xxl"],
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

        return (
          <span className="capitalize">
            {filteredValue &&
              Object.entries(filteredValue).map(([key, valueData], idx) => (
                <p key={idx}>
                  {key} = {`${valueData}`}
                </p>
              ))}
          </span>
        );
      },
      // responsive: ["xxl"],
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
        return (
          <span className="capitalize">
            {filteredValue &&
              Object.entries(filteredValue).map(([key, valueData], idx) => (
                <p key={idx}>
                  {key} = {`${valueData}`}
                </p>
              ))}
          </span>
        );
      },
      // responsive: ["xxl"],
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      render: (value) => {
        return <span>{value}</span>;
      },
      // responsive: ["xxl"],
    },
    {
      title: "Action",
      width: 150,
      // fixed: "right",
      align:"center",
      render: (value) => {
        return (
          <Space className="flex flex-col">
            <button
              className="border px-1 rounded-md hover:border-blue-400 hover:scale-125 transition easy-in-out"
              onClick={() => {
                onClickSale(value._id);
              }}
            >
              <ShoppingTwoTone />
            </button>
            
            <div>
              <button
                className="border px-1 rounded-md mr-1 hover:border-blue-400 hover:scale-125 transition easy-in-out"
                onClick={() => {
                  onClickEditProduct(value);
                }}
              >
                <EditOutlined />
              </button>
              <button
                className="border px-1 rounded-md hover:border-red-400 hover:scale-125 transition easy-in-out"
                onClick={() => {
                  onDeleteClick(value._id);
                }}
              >
                {/* <DeleteOutlined  className="text-red-500" /> */}
                <DeleteFilled className="text-red-500" />
              </button>
            </div>

            <button
              className="border px-1 rounded-md hover:border-blue-400 hover:scale-110 transition easy-in-out"
              onClick={() => {
                onClickDuplicateProduct(value);
              }}
            >
              <span>
                <CopyOutlined /> &amp; <EditOutlined  /> 

              </span>
            </button>
          </Space>
        );
      },
    },
  ];

  const paginationConfig = {
    pageSize: meta?.limit || 10,
    total: meta?.total || 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: number[]) =>
      `${range[0]}-${range[1]} of ${total} items`, // Display total items
    current: meta?.page || 1,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onChange: (page: number, _pageSize: number) => {
      //   productsApi.useGetProductsQuery({ page: page, limit: pageSize });
      dispatch(setProductPageNumber(page));
    },
    onShowSizeChange: (_current: number, size: number) => {
      dispatch(setProductPageNumber(1));
      dispatch(setProductLimitPerPage(size));
    },
  };

  return (
    <div className="overflow-x-auto">
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
        // scroll={{ x: 'calc(1700px + 50%)',  }}
        scroll={{ x: 'auto',  }}
      />
    </div>
  );
};

export default ProductsTable;
