import { Controller } from 'react-hook-form';
import Input from 'antd/es/input/Input';

type TElectroInputProps = {
    type?: string;
    id?: string;
    name?:string;
    label?:string;
    defaultValue?:string;
}

const ElectroInput = ({type='text',id='',name='',label='',defaultValue=undefined}:TElectroInputProps) => {
    return (
        <div style={{marginBottom:'20px'}}>  
            {
                label && <label htmlFor={id}>{label}: </label>
            }
            {/* <input {...register(name)} type={type} id={id} /> */}
            
            <Controller 
                name={name}
                defaultValue={defaultValue}
                render={({field})=> <Input {...field} type={type} id={id} defaultValue={defaultValue} />}
            />
        </div>
    );
};

export default ElectroInput;