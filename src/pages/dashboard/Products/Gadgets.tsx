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
import CreateSaleModal from "./CreateSaleModal";
import { useSearchParams } from "react-router-dom";
import FilterItems from "./FilterItems";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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

const Gadgets = () => {
  const dispatch = useDispatch();
  const meta = useAppSelector(productGetters.selectProductMeta);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sellOrderModalStatus, setSellOrderModalStatus] = useState(false);
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [editedDuplicateProduct, setEditedDuplicateProduct] = useState<
    TProduct | undefined
  >(undefined);
  const [isEditedProduct, setIsEditedProduct] = useState<boolean>(false);

  const { data: products, isLoading } = productsApi.useGetProductsQuery({
    page: meta.page,
    limit: meta.limit,
    search,
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

  return (
    <div>
      Show all Gadgets Page
      <div>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="flex items-center"
            type="primary"
            danger
            disabled={false}
            loading={true}
          >
            <DeleteOutlined /> Bulk Delete
          </Button>
          <Button
            type="dashed"
            className="bg-blue-300  block my-2 font-bold"
            onClick={onOpenModal}
          >
            Add Gadget
          </Button>
        </div>
        <AddProductModal
          defaultProduct={editedDuplicateProduct}
          onCloseModal={onCloseModal}
          openModal={openAddProductModal}
          isEditedProduct={isEditedProduct}
        />

        <CreateSaleModal
          modalStatus={sellOrderModalStatus}
          onModalClose={onSaleOrderModalClose}
        />
        <FilterItems onSearch={onSearch} />
        <ProductsTable
          data={products?.data?.data || []}
          meta={products?.data?.meta}
          isLoading={isLoading}
          onClickDuplicateProduct={onClickDuplicateProduct}
          onClickEditProduct={onClickEditProduct}
          onClickSale={onSaleOrderModalOpen}
        />
      </div>
    </div>
  );
};

export default Gadgets;
