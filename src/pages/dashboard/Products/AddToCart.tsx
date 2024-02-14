import { Modal } from 'antd';
import ElectroForm from '../../../components/form/ElectroForm';
import { FieldValues } from 'react-hook-form';
import ElectroInput from '../../../components/form/ElectroInput';
import ElectroButton from '../../../components/form/ElectroButton';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import { TProduct, addToCart } from '../../../redux/features/products/productSlice';
import { useAppDispatch } from '../../../redux/storeHook';

type TCreateSaleModalProps = {
    modalStatus: boolean;
    onModalClose:() =>void;
    products: TProduct[];
}

const AddToCart = ({products,modalStatus,onModalClose}:TCreateSaleModalProps) => {
  const [searchParams, ] = useSearchParams();
  const productId = searchParams.get('productId');
  const dispatch = useAppDispatch();
  const product = products.find(el=>el._id === productId);


  const onSaleProductHandler = async(data: FieldValues ) => {
    const toastId = toast.loading('Adding to cart');
    if (!productId) {
      toast.error('Click on sell button',{id:toastId,duration:2000})
      return
    }
    const quantity = parseInt(data.quantity || 0);
    console.log(quantity);
    
    if (quantity<1) {
        toast.error('Atleast 1 item is required',{id:toastId,duration:2000})
        return
    }
    if (product && quantity>product?.quantity) {
        toast.error('Insufficient quantity',{id:toastId,duration:2000})
        return
    }
    const cartItem = {
        quantity: parseInt(data.quantity),
        product,
    }
    console.log({cartItem});
    dispatch(addToCart({
        quantity: parseInt(data.quantity),
        productId
    }))
    
    toast.success('Added product to cart',{id:toastId,duration:2000})
    onModalClose();
    return {isClear:true}
  };



  const fields = [
   
    {
        label:"Product Quantity",
        name:"quantity",
        errKey:"quantity",
        type:"number",
        placeholder:"eg. 9",
      },
  ];
  return (
        <>
      <Modal
        title={"Add the product to cart"}
        open={modalStatus}
        onOk={()=>{}}
        confirmLoading={false}
        onCancel={onModalClose}
        okButtonProps={{
          className: "bg-green-400 text-green-900 font-bold",
        }}
        footer={null}
        width={'auto'}
        style={{maxWidth:"700px"}}
      >
        <ElectroForm
          className="border p-4 rounded-lg shadow-md"
          onSubmit={onSaleProductHandler}
          defaultValues={undefined}
        >
            <div>
                <h2 className='text-center text-xl font-semibold'>{product?.name}</h2>
                <img className='w-[150px] m-auto my-4' src={product?.img} alt="" />
            </div>
          <div className='grid grid-cols-2 gap-2 '>
            <ElectroInput 
                label='Price Per Piece'
                value={product?.price}
                disabled={true}
                classNameField='!text-gray-600'
            />
            {
                fields.map((field, idx) =>{
                    
                    return <ElectroInput
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    placeHolder={field.placeholder}
                    // defaultValue={field.defaultValue}
                    key={idx}
                    // error={errorFormatToObj(error)[field.errKey]}
                  />
                })
            }
          </div>
          <ElectroButton className='block m-auto'  type="submit">Add to cart</ElectroButton>
        </ElectroForm>
      </Modal>
    </>
    );
};

export default AddToCart;