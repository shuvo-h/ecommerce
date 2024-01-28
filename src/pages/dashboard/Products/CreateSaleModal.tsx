import { Modal } from 'antd';
import ElectroForm from '../../../components/form/ElectroForm';
import { FieldValues } from 'react-hook-form';
import ElectroInput from '../../../components/form/ElectroInput';
import { errorFormatToObj, errorFormatToString } from '../../../utilies/errorFormatter';
import ElectroButton from '../../../components/form/ElectroButton';
import { TProductSellBodyInfo, salesApi } from '../../../redux/features/sales/salesApi';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';

type TCreateSaleModalProps = {
    modalStatus: boolean;
    onModalClose:() =>void;
}

const CreateSaleModal = ({modalStatus,onModalClose}:TCreateSaleModalProps) => {
  const [searchParams, ] = useSearchParams();
  const [sellProductByIdMutation,{isLoading,error}] = salesApi.useSellProductByIdMutation()
  
  const onSaleProductHandler = async(data: FieldValues ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    const productId = searchParams.get('productId');
    
    const toastId = toast.loading('Selling the product');
    if (!productId) {
      toast.error('Click on sell button',{id:toastId,duration:2000})
      return
    }
    try {
      const bodyData = {
        product:productId,
        soldDate: new Date().toISOString(),
        quantity: parseInt(data.quantity),
        ...data,
      }
      const result = await sellProductByIdMutation(bodyData as TProductSellBodyInfo)
      if ('data' in result) {
        toast.success("Product Edited successfully",{id:toastId,duration:2000})
        onModalClose();
      }else{
        toast.error('Failed to update product',{id:toastId,duration:2000})
      }

    } catch (err) {
      console.log(err);
      toast.error(errorFormatToString(err),{id:toastId,duration:2000})
    }
   
    
    
  };

  const defaultFields = {
    buyerName: "",
    quantity:0
  }


  const fields = [
    {
        label:"Buyer Name",
        name:"buyerName",
        errKey:"buyerName",
        type:"text",
        placeholder:"eg. Mr. Daniel",
      },
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
        title={"Fill up the sell form"}
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
          className="grid md:grid-cols-2 gap-2 border p-4 rounded-lg shadow-md"
          onSubmit={onSaleProductHandler}
          defaultValues={defaultFields}
        >
            {
                fields.map((field, idx) =>{
                    
                    return <ElectroInput
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    placeHolder={field.placeholder}
                    // defaultValue={field.defaultValue}
                    key={idx}
                    error={errorFormatToObj(error)[field.errKey]}
                  />
                })
            }
          <ElectroButton loading={isLoading} disabled={isLoading} type="submit">Sell Product</ElectroButton>
          <span className="text-red-500">{errorFormatToObj(error)[""] ? errorFormatToObj(error)[""] || "Failed to create order": null}</span>
        </ElectroForm>
      </Modal>
    </>
    );
};

export default CreateSaleModal;