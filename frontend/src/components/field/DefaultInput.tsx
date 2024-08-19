import { useState } from "react";
import { DefaultPopup } from "../popup/default_popup";

type DefaultInputProps = {
  onChange: (v: string) => void;
  value?: string;
  label: string;
  required?: boolean;
  hints?: { id: string; name: string }[];
  discription?: string;
};

export function DefaultInput({
  onChange,
  value,
  label,
  required,
  discription,
  hints,
}: DefaultInputProps) {
  const [clicked, setClick] = useState(false);

  required == undefined ? (required = false) : (required = true);
  return (
    <div className="flex flex-col">
      <label htmlFor={label}>
        {label}
        {required && <span className="text-red-600"> *</span>}
      </label>
      <input
        className="border border-neutral-950 p-1 rounded-lg"
        id={label}
        onChange={(value) => onChange(value.target.value)}
        onClick={() => setClick(!clicked)}
        name={label}
        value={value}
        type="text"
        autoComplete="off"
        required={required}
      />
      {discription && (
        <p className="font-extralight text-xs pl-2 pt-1 text-gray-500">
          {discription}
        </p>
      )}
      {hints && clicked && (
        <DefaultPopup clickHandler={() => setClick(false)}>
          <div className="absolute flex flex-col bg-slate-100 w-80 h-60 overflow-y-scroll rounded-lg border top-16">
            {hints.map((hint) => {
              return (
                <div
                  key={hint.id}
                  onClick={() => {
                    console.log(hint.id);
                    onChange(hint.id);
                    setClick(false);
                  }}
                  className="w-full p-2 hover:bg-slate-200 rounded-lg text-base"
                >
                  {hint.name}{" "}
                  <span className="text-gray-400 text-xs">{hint.id}</span>
                </div>
              );
            })}
          </div>
        </DefaultPopup>
      )}
    </div>
  );
}
