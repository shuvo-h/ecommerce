import { Select } from 'antd';

type TOption = {value:string;label:string}
type TElectroSelectProps = {
    onChange:(value:string)=>void;
    onSearch?:(value:string)=>void;
    options: TOption[]
    defaultValue:string | undefined;
    placeholder:string;
    isLoading?:boolean;
    className?: string;
}

const ElectroSelect = ({onChange,onSearch,options,defaultValue,isLoading,placeholder,className}:TElectroSelectProps) => {
    
    return (
        <Select
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={true}
            options={options}
            defaultValue={defaultValue}
            className={`min-w-36 ${className}`}
            loading={isLoading}
        />
    );
};

export default ElectroSelect;