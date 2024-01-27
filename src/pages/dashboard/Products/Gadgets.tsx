import { productsApi } from "../../../redux/features/products/productsApi";
import ProductsTable from "./ProductsTable";


const Gadgets = () => {
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = productsApi.useGetProductsQuery({ page: 5, limit: 2000 });
  console.log({ products });
  return (
    <div>
      Show all Gadgets Page
      <div>
        {!isLoading &&
          products.data.data.map((el) => <h1 key={el._id}>{el.name}</h1>)}
      </div>
      <div>
        <ProductsTable data={products?.data?.data || []} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Gadgets;
