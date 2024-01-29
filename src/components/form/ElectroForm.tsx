import  { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TElectroFormProps = {
  // onSubmit: (data: FieldValues) => Promise<void>;
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  className?: string;
} & TFormConfig;

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
};

const ElectroForm = ({
  children,
  onSubmit,
  defaultValues,
  className = "",
}: TElectroFormProps) => {
  /*
    const formConfig:TFormConfig = {};
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    const methods = useForm(formConfig);
    */

  const methods = useForm({ defaultValues });

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    } else {
      methods.reset({});
    }
  }, [defaultValues, methods]);

  const handleSubmitFn = async (data: FieldValues) => {
    // Call your onSubmit API handler
    try {
      const isClear =  await onSubmit(data);
      // Reset the form if the API call is successful
      console.log({isClear});
      if (isClear) {
        methods.reset(defaultValues || {});
      }
    } catch (error) {
      // Handle error if necessary
      console.error("Error submitting form:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(handleSubmitFn)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ElectroForm;
