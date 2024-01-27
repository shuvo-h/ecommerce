
import { productsApi } from "../../../redux/features/products/productsApi";
import ProductsTable from "./ProductsTable";
import { useAppSelector } from "../../../redux/storeHook";
import { productGetters } from "../../../redux/features/products/productSlice";


const Gadgets = () => {
    const meta = useAppSelector(productGetters.selectProductMeta)
    console.log(meta);
    
  const {
    data: products,
    isLoading,
  } = productsApi.useGetProductsQuery({ page: meta.page, limit: meta.limit });

  return (
    <div>
      Show all Gadgets Page
      <div>
        <ProductsTable data={products?.data?.data || []} meta={products?.data?.meta} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Gadgets;
