import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ITextField {
  label?: string;
  placeholder?: string;
  type: string;
  register?: UseFormRegisterReturn;
  error?: string;
  value?: string;
  margin?: boolean;
  allowFloats?: boolean;
  disabled?: boolean;
  border?: boolean;
  onValueChage?: (value: string) => void;
  additionalClass?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextField: FC<ITextField> = ({
  label,
  placeholder,
  type,
  register,
  error,
  value = "",
  disabled = false,
  margin = true,
  allowFloats = false,
  onValueChage,
  additionalClass = "",
  onChange,
  ...props
}) => {
  return (
    <div className='block w-full'>
      {label && (
        <label className='block capitalize text-sm font-medium leading-6 text-gray-500'>
          {label}
        </label>
      )}
      <div className={`${margin ? "mt-1" : ""} w-full`}>
        <input
          {...register}
          {...props}
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          onChange={(e) => {
            if (onValueChage) onValueChage(e.target.value);
            if (onChange) onChange(e);
          }}
          className={`${additionalClass} block w-full rounded-md border-0 py-2.5 px-2.5 text-gray-900  ${
            disabled ? "bg-inherit" : "ring-1 ring-inset shadow-sm"
          } focus:ring-1 focus:ring-inset ${
            error
              ? `focus:ring-red-500 ring-red-300 placeholder:text-red-400`
              : `focus:ring-darkblue ring-gray-200 placeholder:text-gray-400`
          }  sm:text-sm sm:leading-6 outline-none min-w-[5rem]`}
          {...(disabled ? { disabled: true } : {})}
          {...(allowFloats ? { step: 0.001 } : {})}
        />
        <label className='block text-sm leading-6 text-red-500'>{error}</label>
      </div>
    </div>
  );
};
export default TextField;