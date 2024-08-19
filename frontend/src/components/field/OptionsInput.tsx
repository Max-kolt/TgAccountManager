import { useState } from "react";
import { DefaultPopup } from "../popup/default_popup";
import ArrowIcon from "/arrow-down.svg";

type OptionProps = {
  name: string;
};

type OptionsInputProps = {
  label: string;
  options: OptionProps[];
  current: number;
  onChange: (i: number) => void;
  discription?: string;
  required?: boolean;
};

export function OptionsInput({
  label,
  options,
  current,
  onChange,
  discription,
  required,
}: OptionsInputProps) {
  const [clicked, setClick] = useState(false);

  required == undefined ? (required = false) : (required = true);
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <div
        onClick={() => setClick(true)}
        className="w-full relative border flex items-centerrelative border-neutral-950 p-1 rounded-lg"
      >
        <p>{options[current].name}</p>
        <img
          src={ArrowIcon}
          className={
            "absolute right-2 transition-transform " + (clicked && "rotate-180")
          }
        />
      </div>
      {clicked && (
        <DefaultPopup clickHandler={() => setClick(false)}>
          <div className="absolute flex flex-col bg-slate-100 w-80 rounded-lg border top-16">
            {options.map((value, index) => {
              return (
                <div
                  onClick={() => {
                    setClick(false);
                    onChange(index);
                  }}
                  className="w-full p-2 hover:bg-slate-200 rounded-lg"
                >
                  {value.name}
                </div>
              );
            })}
          </div>
        </DefaultPopup>
      )}

      {discription && (
        <p className="font-extralight text-xs pl-2 pt-1 text-gray-500">
          {discription}
        </p>
      )}
    </div>
  );
}
