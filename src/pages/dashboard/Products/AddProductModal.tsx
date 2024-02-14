import {  Modal } from "antd";
import ElectroForm from "../../../components/form/ElectroForm";
import { FieldValues } from "react-hook-form";
import ElectroInput from "../../../components/form/ElectroInput";
import ElectroButton from "../../../components/form/ElectroButton";
import { productsApi } from "../../../redux/features/products/productsApi";
import { TProduct } from "../../../redux/features/products/productSlice";
import { toast } from "sonner";
import { errorFormatToObj, errorFormatToString } from "../../../utilies/errorFormatter";
import ElectroFileInput from "../../../components/form/ElectroFileInput";
import { useState } from "react";

type TAddProductModalProps = {
  defaultProduct?: TProduct
  openModal: boolean
  isEditedProduct: boolean;
  onCloseModal: ()=>void;
}

const AddProductModal = ({defaultProduct, openModal, onCloseModal, isEditedProduct}:TAddProductModalProps) => {
  const [addProductMutation,{isLoading,error}] = productsApi.useAddProductMutation()
  const [editProductByIdMutation,{isLoading:isEditLoading,error:editError}] = productsApi.useEditProductByIdMutation()
  const [previewImage,setPreviewImage] = useState<string>('');
  

  const handleOk = () => {
    console.log("clicked ok");
  };
  const onFileChange = (file:File|undefined) => {
    if (file instanceof File) {
      const imgUrl = URL.createObjectURL(file)
      setPreviewImage(imgUrl)
    }
  };

  const onAddProduct = async(data: FieldValues ) => {
    const toastId = toast.loading(isEditedProduct ? "Updating product....." :'creating new product');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {slug,...restData} = data;
      
      if (data.img && data.img instanceof File) {
        const imgBBApi = import.meta.env.VITE_IMGBB_API_KEY;
        
        const formData = new FormData();
        formData.append('key',imgBBApi);
        formData.append('image',data.img);
        formData.append('name', data.name)
        console.log(Object.fromEntries(formData));
        const uploadRes = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        if (uploadRes.success) {
          restData.img = uploadRes.data?.url;
        }
      }
      const dimension = {
        height: Number(data.dimension.height),
        width: Number(data.dimension.width),
        depth: Number(data.dimension.depth),
      }
      const formattedData = {
        ...restData,
        price: Number(data.price),
        quantity: Number(data.quantity),
        releaseDate: new Date(data.releaseDate).toISOString(),
        dimension,
      }

      if (isEditedProduct) {
        // call edit API
        const result = await editProductByIdMutation({productId: data._id, product:formattedData})
        if ('data' in result) {
          setPreviewImage('')
          toast.success("Product Edited successfully",{id:toastId,duration:2000})
          onCloseModal();
        }else{
          toast.error('Failed to update product',{id:toastId,duration:2000})
        }
        
      }else{
        // call create API
        const result = await addProductMutation(formattedData as TProduct)
        if ('data' in result) {
          setPreviewImage('')
          toast.success("Product created successfully",{id:toastId,duration:2000})
          onCloseModal();
        }else{
          console.log(result);
          toast.error('Failed to create product',{id:toastId,duration:2000})
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(errorFormatToString(err),{id:toastId,duration:2000})
    }
   
    
    
  };

  const fields = [
    {
        label:"Product Name",
        name:"name",
        errKey:"name",
        type:"text",
        placeholder:"type gadget name",
      },
    {
      label:"Product Price",
      name:"price",
      errKey:"price",
      type:"number",
      placeholder:"type the price",
    },
    {
      label:"Product Quantity",
      name:"quantity",
      errKey:"quantity",
        type:"number",
        placeholder:"type quantity",
    },
    {
        label:"Release Date",
        name:"releaseDate",
        errKey:"releaseDate",
        type:"date",
        placeholder:"",
        defaultValue: new Date().toISOString().split("T")[0]
    },
    {
      label:"Brand Name",
      name:"brand",
      errKey:"brand",
      type:"text",
      placeholder:"",
    },
    {
      label:"Model Name or ID",
      name:"model",
      errKey:"model",
      type:"text",
      placeholder:"",
    },
    {
      label:"Product category",
      name:"category",
      errKey:"category",
      type:"text",
      placeholder:"",
    },
    {
      label:"Connectivity",
      name:"connectivity",
      errKey:"connectivity",
      type:"text",
      placeholder:"",
    },
    {
      label:"Power Source",
      name:"powerSource",
      errKey:"powerSource",
      type:"text",
      placeholder:"",
    },
    {
      label:"Camera Resolution",
      name:"features.cameraResolution",
      type:"text",
      errKey:"cameraResolution",
      placeholder:"",
    },
    {
      label:"Storage Capacity",
      name:"features.storageCapacity",
      errKey:"storageCapacity",
      type:"text",
      placeholder:"",
    },
    {
      label:"Screen Size",
      name:"features.screenSize",
      errKey:"screenSize",
      type:"text",
      placeholder:"",
    },
    {
      label:"Height",
      name:"dimension.height",
      errKey:"height",
      type:"number",
      placeholder:"900",
    },
    {
      label:"Weight",
      name:"dimension.width",
      errKey:"width",
      type:"number",
      placeholder:"400",
    },
    
    {
      label:"Depth",
      name:"dimension.depth",
      errKey:"depth",
      type:"number",
      placeholder: '200',
    },
    {
      label:"Weight",
      name:"weight",
      errKey:"weight",
        type:"text",
        placeholder:"200g",
        defaultValue:""
    },
  ]

 
  return (
    <>
      {/* <Button
        type="dashed"
        className="bg-blue-300 ml-auto block my-2 font-bold"
        onClick={onOpenModal}
      >
        Add Gadget
      </Button> */}
      <Modal
        title={isEditedProduct ? "Edit Electric Gadget": "Add an Electric Gadget"}
        open={openModal}
        onOk={handleOk}
        confirmLoading={isLoading || isEditLoading}
        onCancel={()=>{onCloseModal();}}
        okText={"Create Product"}
        okButtonProps={{
          className: "bg-green-400 text-green-900 font-bold",
        }}
        footer={null}
        width={'auto'}
        style={{maxWidth:"700px"}}
      >
        <ElectroForm
          className="border p-4 rounded-lg shadow-md"
          onSubmit={onAddProduct}
          defaultValues={defaultProduct as FieldValues}
        >
          <div className="grid md:grid-cols-2 gap-2">
            {
                fields.map((field, idx) =>{
                    
                    return <ElectroInput
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    placeHolder={field.placeholder}
                    defaultValue={field.defaultValue}
                    key={idx}
                    error={errorFormatToObj(error || editError)[field.errKey]}
                  />
                })
            }

            <div>
              <img className={`h-[${previewImage||defaultProduct?.img ? 150:0}px]`} src={previewImage||defaultProduct?.img} alt="" />
              <ElectroFileInput 
                label="Image"
                name="img"
                onFileChange={onFileChange}
              />
            </div>
          </div>
            <div >
              <ElectroButton loading={isLoading || isEditLoading} disabled={isLoading || isEditLoading} type="submit">{isEditedProduct ? "Update" : "Create"} Product</ElectroButton>

            </div>
          <span className="text-red-500">{errorFormatToObj(error || editError)[""] ? "Name already exist": null}</span>
        </ElectroForm>
      </Modal>
    </>
  );
};

export default AddProductModal;
