import { FC, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
interface IOptionFielOption {
  value: string;
  label: string;
  disabled?: boolean;
  selected?: boolean;
}
interface IOptionsField {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  options?: IOptionFielOption[];
  defaultValue?: string;

  disabled?: boolean;
  margin?: boolean;
  required?: boolean;
  defaultLabel?: string;
  onChange?: (value: string) => void;
  onValueChage?: (value: string) => void;
  setValue?: (params: string) => void;
}
const OptionsField: FC<IOptionsField> = ({
  label,
  options,
  register,
  error,
  defaultValue,
  required = true,
  margin = true,
  defaultLabel,
  disabled = false,
  setValue,
  onChange,
  onValueChage,
}) => {
  useEffect(() => {
    if (defaultValue?.trim()) {
      if (setValue) {
        setValue(defaultValue);
      }
    }
  }, [defaultValue, setValue]);
  return (
    <div>
      {label && (
        <label className='block capitalize text-sm font-medium leading-6 text-gray-500'>
          {label}
        </label>
      )}
      <div className={`${margin ? "mt-1" : ""} w-full`}>
        <select
          {...register}
          onChange={(e) => {
            if (onValueChage) {
              onValueChage(e.target.value);
            }
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          defaultValue={defaultValue}
          className={`block w-full rounded-md bg-white border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-1 focus:ring-inset ${
            error
              ? `focus:ring-red-500 ring-red-300 placeholder:text-red-400`
              : `focus:ring-darkblue ring-gray-200 placeholder:text-gray-400`
          }  sm:text-sm sm:leading-6 outline-none`}
          {...(disabled ? { disabled: true } : {})}
        >
          {!required && (
            <option value={""}>{defaultLabel ? defaultLabel : "Select one"}</option>
          )}
          {options?.map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        <label className='block text-sm leading-6 text-red-500'>{error}</label>
      </div>
    </div>
  );
};
export default OptionsField;
