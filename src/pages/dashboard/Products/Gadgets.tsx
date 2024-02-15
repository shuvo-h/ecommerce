/* eslint-disable @typescript-eslint/no-explicit-any */

import { productsApi } from "../../../redux/features/products/productsApi";
import ProductsTable from "./ProductsTable";
import { useAppSelector } from "../../../redux/storeHook";
import {
  TProduct,
  productGetters,
  setProductPageNumber,
} from "../../../redux/features/products/productSlice";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import AddProductModal from "./AddProductModal";
import { useDispatch } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import FilterItems from "./FilterItems";
import { Button } from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { errorFormatToString } from "../../../utilies/errorFormatter";
import AddToCart from "./AddToCart";

const defaultProductFormModalValue = {
  _id: "",
  name: "",
  price: "",
  quantity: "",
  releaseDate: new Date().toISOString().split("T")[0],
  brand: "",
  model: "",
  category: "",
  connectivity: "",
  powerSource: "",
  features: {
    cameraResolution: "",
    storageCapacity: "",
    screenSize: "",
  },
  dimension: {
    height: "",
    width: "",
    depth: "",
  },
  weight: "",
};

const purifyObject = (object:Record<string,unknown>) =>{
  const newObj:Record<string,unknown> = {};
  for ( const key in object){
    if (object[key]) {
      newObj[key] = object[key];
    }
  }
  return newObj;
}

const Gadgets = () => {
  const dispatch = useDispatch();
  const meta = useAppSelector(productGetters.selectProductMeta);
  const query = useAppSelector(productGetters.selectProductQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sellOrderModalStatus, setSellOrderModalStatus] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [editedDuplicateProduct, setEditedDuplicateProduct] = useState<
    TProduct | undefined
  >(undefined);
  const [isEditedProduct, setIsEditedProduct] = useState<boolean>(false);

  const [deleteSelectedProductsMutation,{isLoading:isBulkDeleteLoading,}] = productsApi.useDeleteProductsByIdsMutation()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isFilterExpand, setIsFilterExpand] = useState<boolean>(false);
  const cart = useAppSelector(productGetters.selectCart);

  const { data: products, isLoading } = productsApi.useGetProductsQuery({
    page: meta.page,
    limit: meta.limit,
    search,
    ...purifyObject({...query}),
  });

  

  const onSearch = (data: FieldValues) => {
    // set search page to 1 always
    dispatch(setProductPageNumber(1));
    setSearch(data.search);
  };

  const onCloseModal = () => {
    setOpenAddProductModal(false);
    setEditedDuplicateProduct(undefined);
    setIsEditedProduct(false);
  };
  const onOpenModal = () => {
    setOpenAddProductModal(true);
    setEditedDuplicateProduct(defaultProductFormModalValue as any);
  };
  const onClickDuplicateProduct = (product: TProduct) => {
    setEditedDuplicateProduct(product);
    setOpenAddProductModal(true);
  };
  const onClickEditProduct = (product: TProduct) => {
    setEditedDuplicateProduct(product);
    setIsEditedProduct(true);
    setOpenAddProductModal(true);
  };

  // sales order methods
  const onSaleOrderModalOpen = (productId: string) => {
    setSearchParams({ productId });
    setSellOrderModalStatus(true);
  };
  const onSaleOrderModalClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("productId");
    setSearchParams(params.toString());
    setSellOrderModalStatus(false);
  };

  const bulkProductDeletehandler = async() =>{
    const toastId = toast.loading('Deleting the selected products');
    if (!selectedRowKeys.length) {
      toast.error('Please select the products first',{id:toastId,duration:2000})
      return
    }
    try {
      const result = await deleteSelectedProductsMutation(selectedRowKeys as string[])
      console.log({result});
      
      if ('data' in result) {
        if (result.data?.success) {
          setSelectedRowKeys([]);
          toast.success( result.data?.message || "Products are deleted successfully!",{id:toastId,duration:2000});
        }else{
          toast.error(result.data?.message ||'Failed to update product',{id:toastId,duration:2000})
        }
        // onModalClose();
      }else{
        toast.error('Failed to update product',{id:toastId,duration:2000})
      }

    } catch (err) {
      console.log(err);
      toast.error(errorFormatToString(err),{id:toastId,duration:2000})
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold sm:font-bold text-blue-500" >Gadgets List</h1>
      <div>
        <div className="flex flex-wrap items-center justify-end gap-x-2 md:gap-x-4">
          <Button
            className={`flex items-center ${selectedRowKeys.length ? null : 'hidden'}`}
            type="primary"
            danger
            disabled={isBulkDeleteLoading}
            loading={isBulkDeleteLoading}
            onClick={bulkProductDeletehandler}
          >
            <DeleteOutlined /> Bulk Delete
          </Button>
          <Button
          type="dashed"
          className={`bg-blue-300 ml-auto block my-2 font-bold ${cart.productList.length ? null : 'hidden'}`}
        >
          <NavLink to={'/dashboard/checkout'} > <ShoppingCartOutlined /> Checkout ({cart.productList.length})</NavLink>
        </Button>
          <Button
            type="dashed"
            className="bg-blue-300  block my-2 font-bold"
            onClick={onOpenModal}
          >
            Add Gadget
          </Button>
          <Button
            type="dashed"
            className={`bg-red-300  block my-2 font-bold ${isFilterExpand?"bg-blue-300 ":"bg-blue-100 text-black-500"}`}
            onClick={()=>setIsFilterExpand(!isFilterExpand)}
          >
            Advance Filter
          </Button>
        </div>
        <AddProductModal
          defaultProduct={editedDuplicateProduct}
          onCloseModal={onCloseModal}
          openModal={openAddProductModal}
          isEditedProduct={isEditedProduct}
        />

        {/* <CreateSaleModal
          modalStatus={sellOrderModalStatus}
          onModalClose={onSaleOrderModalClose}
        /> */}
        
        
        <AddToCart 
          modalStatus={sellOrderModalStatus}
          onModalClose={onSaleOrderModalClose}
          products={products?.data?.data || []}
        />
        <div className={`${isFilterExpand ? 'max-h-[1400px]': 'max-h-0'} transition-all duration-200 easy-in-out overflow-hidden`}>
          <FilterItems onSearch={onSearch} />
        </div>
        <ProductsTable
          data={products?.data?.data || []}
          meta={products?.data?.meta}
          isLoading={isLoading}
          onClickDuplicateProduct={onClickDuplicateProduct}
          onClickEditProduct={onClickEditProduct}
          onClickSale={onSaleOrderModalOpen}
          setSelectedRowKeys={setSelectedRowKeys}
          selectedRowKeys={selectedRowKeys}
        />
      </div>
    </div>
  );
};

export default Gadgets;
