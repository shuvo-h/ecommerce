
import { useAppDispatch, useAppSelector } from "../../../redux/storeHook";
import {
  TCart,
  TProduct,
  clearCart,
  productGetters,
  removeFromCart,
  updateQuantityInCart,
} from "../../../redux/features/products/productSlice";
import { productsApi } from "../../../redux/features/products/productsApi";
import {  Card, Col, Row } from "antd";
import {
  CloseCircleTwoTone,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ElectroForm from "../../../components/form/ElectroForm";
import { FieldValues } from "react-hook-form";
import ElectroInput from "../../../components/form/ElectroInput";
import {
  errorFormatToObj,
  errorFormatToString,
} from "../../../utilies/errorFormatter";
import { salesApi } from "../../../redux/features/sales/salesApi";
import ElectroButton from "../../../components/form/ElectroButton";
import { toast } from "sonner";
import { NavLink,  useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sellProductByIdMutation, { isLoading, error }] =
    salesApi.useSellProductByIdMutation();

  const cart = useAppSelector(productGetters.selectCart);
  const searchQuery = {
    productIds: cart.productList?.map((cartProduct) => cartProduct.product)?.join(","),
  };
  const { data: products } = productsApi.useGetProductsQuery(searchQuery, {
    skip: searchQuery.productIds.length < 1,
  });

  const onCheckoutHandler = async (data: FieldValues) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // console.log(data);
    console.log({ ...data, productList: cart.productList });

    const toastId = toast.loading("Checkouting orders.....");
    try {
      const bodyData = {
        ...data,
        productList: cart.productList,
        soldDate: new Date(data.soldDate || new Date()).toISOString(),
      };

      const result = await sellProductByIdMutation(bodyData as TCart);
      console.log(result);

      if ("data" in result) {
        if (result.data.success) {
          toast.success("Order placed successfully", {
            id: toastId,
            duration: 2000,
          });
          dispatch(clearCart())
          navigate("/dashboard/gadgets");
          return true; // clear the data from react hook form
        }
      } else {
        toast.error("Failed to place order", { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.log(err);
      toast.error(errorFormatToString(err), { id: toastId, duration: 2000 });
    }
  };

  const removeItemFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const updateQuantity = (
    type: "increment" | "decrement",
    productId: string
  ) => {
    const product = products?.data?.data?.find(
      (el: TProduct) => el._id === productId
    );
    const cartProduct = cart.productList.find((el) => el.product === productId);
    console.log(product, cartProduct);
    let newQuantity = cartProduct?.quantity || 0;
    if (type === "increment") {
      newQuantity += 1;
      // check inventory available
      if (product.quantity < newQuantity) {
        return toast.message("Insufficient inventory");
      }
      dispatch(updateQuantityInCart({ productId, quantity: newQuantity }));
    } else {
      newQuantity -= 1;
      // check inventory not going negative
      if (1 > newQuantity) {
        return toast.message("Atleast one item is required");
      }
      dispatch(updateQuantityInCart({ productId, quantity: newQuantity }));
    }
  };

  const getQuantity = (productId: string) => {
    return cart.productList.find((el) => el.product === productId)?.quantity;
  };
  const calculateTotal = () => {
    let total = 0;
    cart.productList.forEach((productEl) => {
      const price = products?.data?.data?.find(
        (el: TProduct) => el._id === productEl.product
      )?.price;

      total += productEl.quantity * price;
    });

    return total.toFixed(2);
  };

  const fields = [
    {
      label: "Buyer Name",
      name: "buyerName",
      errKey: "buyerName",
      type: "text",
      placeholder: "eg. Mr. Daniel",
    },
    {
      label: "Contact Number",
      name: "contactNumber",
      errKey: "contactNumber",
      type: "text",
      placeholder: "eg. 9",
    },
    {
      label: "Sold Date",
      name: "soldDate",
      errKey: "soldDate",
      type: "date",
      placeholder: "eg. 12/02/2024",
    },
  ];

  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold text-center">Checkout Your Products</h2>
      </div>

      <div>
      <div className="bg-gray-100 p-4 rounded-md">
                    <p className="text-gray-600 text-center">No items found in the cart.</p>
                </div>
            <NavLink className={'underline text-center'} to={"/dashboard/gadgets"}>Back to gadget list</NavLink>
      </div>

      <div className={`w-fit m-auto ${cart.productList.length ? '' : 'hidden'}`}>
        <Card>
          <h2 className="text-lg ">Fillup the form and checkot</h2>
          <Row
            className="text-center border-b-2 border-gray-400 mb-2 md:px-8"
            gutter={[20, 0]}
            justify="space-between"
          >
            <Col span={5}>
              <b>Image</b>
            </Col>
            <Col span={10}>
              <b>Name</b>
            </Col>
            <Col span={3}>
              <b>Quantity</b>
            </Col>
            <Col span={4}>
              <b>Price($)</b>
            </Col>
            <Col span={2}>
              <b>Action</b>
            </Col>
          </Row>
          {products?.data?.data?.map((product: TProduct) => (
            <Row
              className="border-b mb-2 md:px-8 py-2"
              key={product._id}
              gutter={[20, 0]}
              justify="space-between"
              align="middle"
            >
              <Col span={5}>
                <img className="w-full max-w-[80px]" src={product.img} />
              </Col>
              <Col span={10}>
                <h2 className="text-md">{product.name}</h2>
              </Col>
              <Col span={3}>
                <div className="text-md text-right">
                  <span className="inline-block cursor-pointer hover:scale-110 transition easy-in-out">
                    <MinusCircleOutlined
                      onClick={() => updateQuantity("decrement", product._id)}
                    />
                  </span>
                  <span className="mx-1">{getQuantity(product._id)}</span>
                  <span className="inline-block cursor-pointer hover:scale-110 transition easy-in-out">
                    <PlusCircleOutlined
                      onClick={() => updateQuantity("increment", product._id)}
                    />
                  </span>
                </div>
              </Col>
              <Col span={4}>
                <h2 className="text-md text-right">{product.price}</h2>
              </Col>
              <Col span={2}>
                <div className="mx-auto text-center cursor-pointer hover:scale-110 transition easy-in-out">
                  <CloseCircleTwoTone
                    onClick={() => removeItemFromCart(product._id)}
                    twoToneColor={"red"}
                  />
                  {/* removeItemFromCart */}
                </div>
              </Col>
            </Row>
          ))}
          <Row>
            <Col span={12} className="mb-2 md:px-8 py-2">
              <h2 className="font-semibold text-md">Total:</h2>
            </Col>
            <Col span={12} className="mb-2 md:px-8 py-2">
              <h2 className="font-semibold text-md text-right">
                {calculateTotal()}
              </h2>
            </Col>
          </Row>
          <ElectroForm
            className=" p-4 "
            onSubmit={onCheckoutHandler}
            defaultValues={undefined}
          >
            <div className="grid md:grid-cols-2 gap-2 ">
              {fields.map((field, idx) => {
                return (
                  <ElectroInput
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    placeHolder={field.placeholder}
                    // defaultValue={field.defaultValue}
                    key={idx}
                    error={errorFormatToObj(error)[field.errKey]}
                  />
                );
              })}
            </div>
            <ElectroButton
              className="block m-auto"
              loading={isLoading}
              disabled={isLoading}
              type="submit"
            >
              Create Order
            </ElectroButton>
            <span className="block m-auto text-center text-red-500">
              {errorFormatToObj(error)[""]
                ? errorFormatToObj(error)[""] || "Failed to create order"
                : null}
            </span>
          </ElectroForm>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
