import { Button } from 'antd';
import React, { ReactNode } from 'react';

type TElectroButtonProps = {
    children:ReactNode | string,
    loading?:boolean,
    disabled?: boolean,
    type?: "button" | "submit" | "reset" | undefined,
    className?: string;
}



const ElectroButton = ({children, loading=false,disabled=false,className, type='button'}:TElectroButtonProps) => {
    return (
        <div>
            <Button className={className} loading={loading} disabled={disabled} htmlType={type}>{children}</Button>
        </div>
    );
};

export default ElectroButton;