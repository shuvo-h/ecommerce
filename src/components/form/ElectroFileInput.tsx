import {  Input } from 'antd';
import { Controller } from 'react-hook-form';

type TElectroFileInputProps = {
    id?: string;
    name?:string;
    label?:string;
    defaultValue?:string;
    accept?:string;
    className?:string;
    classNameLabel?:string;
    onFileChange:(data:File|undefined) =>void
}

const ElectroFileInput = ({id='',name='',label='',className='',classNameLabel='',onFileChange,accept}:TElectroFileInputProps) => {
    return (
        <div className={`mb-5 ${className}`}>
            {label && (
                <label className={`font-semibold ${classNameLabel}`} htmlFor={id}>
                {label}{" "}
                </label>
            )}
            <Controller 
                name={name}
                render={({field:{onChange,value,...restField}})=>(
                    <Input 
                        {...restField}
                        value={value?.fileName}
                        id={id}
                        onChange={(e)=>{onChange(e.target.files?.[0]);onFileChange(e.target.files?.[0])}}
                        name="profile_img"
                        type="file"
                        accept={accept}
                    />
                )}
            />
        </div>
    );
};

export default ElectroFileInput;