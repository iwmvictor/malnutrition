import { FC, Fragment, useEffect, useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export interface IOptionFieldOption {
  value: string;
  label: string;
}

interface IOptionsField {
  label?: string;
  error?: string;
  options: IOptionFieldOption[];
  margin?: boolean;
  disabled?: boolean;
  hideQueryOnChange?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const ComboboxField: FC<IOptionsField> = ({
  label,
  options,
  error,
  defaultValue,
  margin = true,
  hideQueryOnChange = false,
  onChange,
  disabled,
}) => {
  const [selected, setSelected] = useState<IOptionFieldOption | null>(null);
  const [query, setQuery] = useState("");

  const valueChanged = (value: IOptionFieldOption) => {
    if (value == null) {
      setSelected(null);
      if (onChange) {
        onChange("");
      }
    } else {
      setSelected(options.find((option) => option.value == value.value) || null);
      if (onChange) {
        onChange(value.value);
      }
      if (hideQueryOnChange) {
        setQuery("");
      }
    }
  };

  const filteredPeople =
    query === ""
      ? options
      : options.filter((option: IOptionFieldOption) =>
          option.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

  useEffect(() => {
    if (defaultValue && options.length > 0) {
      const defaultOption = options.find((option) => option.value === defaultValue);
      if (defaultOption) {
        setSelected(defaultOption);
        if (onChange) {
          onChange(defaultOption.value);
        }
      }
    }
  }, [defaultValue, options, onChange]);

  return (
    <div className='block w-full'>
      {label && (
        <label className='block capitalize text-sm font-medium leading-6 text-gray-500'>
          {label}
        </label>
      )}
      <div className={`${margin ? "mt-1" : ""} w-full`}>
        <Combobox value={selected} onChange={valueChanged}>
          <div className='relative'>
            <div
              className={`relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left ${
                !disabled ? "ring-1 rig-inset" : ""
              } focus:outline-none focus-visible:ring-1 ${
                error
                  ? `focus-visible:ring-red-500 focus-visible:ring-inset-green ring-red-300`
                  : `focus-visible:ring-darkblue ring-gray-200`
              } sm:text-sm relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}
            >
              <ComboboxInput
                className='w-full border-none py-3 pl-1.5 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none disabled:bg-white'
                displayValue={(option: IOptionFieldOption) =>
                  hideQueryOnChange ? "" : option?.label
                }
                disabled={disabled}
                onChange={(event) => setQuery(event.target.value)}
              />
              {!disabled && (
                <ComboboxButton className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </ComboboxButton>
              )}
            </div>
            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions
                className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ${
                  !disabled ? "shadow-sm ring-1 ring-black/5 focus:outline-none" : ""
                } sm:text-sm`}
                style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}
              >
                {filteredPeople.length === 0 && query !== "" ? (
                  <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                    Nothing found.
                  </div>
                ) : (
                  filteredPeople.slice(0, 30).map((option: IOptionFieldOption) => (
                    <ComboboxOption
                      key={option.value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-darkblue text-white" : "text-gray-900"
                        }`
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            title={option.label}
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-darkblue"
                              }`}
                            >
                              <CheckIcon className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
        <label className='block text-sm leading-6 text-red-500'>{error}</label>
      </div>
    </div>
  );
};

export default ComboboxField;
