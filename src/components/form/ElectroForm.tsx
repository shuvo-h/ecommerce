import React, { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type TElectroFormProps = {
    // onSubmit: (data: FieldValues) => Promise<void>;
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode;
    className?: string;
} & TFormConfig

type TFormConfig = {
    defaultValues?: Record<string,unknown>,

}

const ElectroForm = ({children,onSubmit,defaultValues, className=''}:TElectroFormProps) => {
    const formConfig:TFormConfig = {};
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }
    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <form className={className} onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default ElectroForm;