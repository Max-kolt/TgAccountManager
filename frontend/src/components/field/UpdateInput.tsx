import { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import Editicon from "/edit.svg";
import SaveIcon from "/save.svg";

type UpdateFieldProps = {
  callbackHandler: () => void;
  onChange: (v: string) => void;
  value?: string;
  label?: string;
};

export function UpdateField({
  callbackHandler,
  onChange,
  value,
  label,
}: UpdateFieldProps) {
  const [isActive, setActive] = useState(false);

  const submit = () => {
    callbackHandler();
    setActive(false);
  };

  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <div className="flex gap-1">
        <input
          className={
            (!isActive && "border-gray-400 text-gray-500") +
            " border px-2 rounded-lg w-full  " +
            (isActive && "text-black border-gray-900")
          }
          type="text"
          value={value}
          name={label}
          disabled={!isActive}
          onChange={(e) => onChange(e.target.value)}
        />
        {isActive ? (
          <DefaultButton
            callbackHandler={submit}
            custom="p-1 border-green-400 min-w-12 min-h-12 hover:bg-green-200 border-2"
            img={SaveIcon}
          />
        ) : (
          <DefaultButton
            img={Editicon}
            custom="min-w-12 min-h-12"
            callbackHandler={() => setActive(true)}
          />
        )}
      </div>
    </div>
  );
}
