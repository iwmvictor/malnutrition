import { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { generateRandomId } from "../../../constants/helperFunctions";

interface ICheckbox {
  label?: string;
  value?: string;
  register?: UseFormRegisterReturn;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}
const Checkbox: FC<ICheckbox> = ({ label, value, register, disabled, onChange }) => {
  const uniqueId = `checkbox-${generateRandomId()}`;

  return (
    <div className='flex items-center space-x-2 text-base'>
      <input
        type='checkbox'
        id={uniqueId}
        {...register}
        defaultValue={value}
        className='h-5 w-5 checkbox rounded cursor-pointer'
        {...(disabled ? { disabled: true } : {})}
        onChange={(e) => onChange?.(e.target.checked)}
      />

      {label && (
        <label
          htmlFor={uniqueId}
          className='text-gray-700 cursor-pointer capitalize'
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
