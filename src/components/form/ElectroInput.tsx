import { Controller } from "react-hook-form";
import Input from "antd/es/input/Input";

type TElectroInputProps = {
  type?: string;
  id?: string;
  name?: string;
  label?: string;
  defaultValue?: string | number;
  value?: number | string;
  placeHolder?: string | undefined;
  className?: string;
  classNameLabel?: string;
  classNameField?: string;
  error?: string;
};

const ElectroInput = ({
  type = "text",
  id = "",
  name = "",
  error = "",
  label = "",
  className,
  classNameLabel,
  classNameField,
  value,
  defaultValue = undefined,
  placeHolder = undefined,

}: TElectroInputProps) => {
  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label className={`font-semibold ${classNameLabel}`} htmlFor={id}>
          {label}{" "}
        </label>
      )}
      {/* <input {...register(name)} type={type} id={id} /> */}
      {value ? (
        <Controller
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              {...field}
              className={classNameField}
              value={value}
              type={type}
              id={id}
              defaultValue={defaultValue}
              placeholder={placeHolder}
              
            />
          )}
        />
      ) : (
        <Controller
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              {...field}
              className={classNameField}
              type={type}
              id={id}
              defaultValue={defaultValue}
              placeholder={placeHolder}
            />
          )}
        />
      )}
      <span className="relative block min-h-1">
        <span className="text-red-500 font-sm absolute">{error}</span>
      </span>
    </div>
  );
};

export default ElectroInput;
