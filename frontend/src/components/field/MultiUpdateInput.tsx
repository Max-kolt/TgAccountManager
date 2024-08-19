import { useState } from "react";
import { DefaultButton } from "../button/DefaultButton";
import Editicon from "/edit.svg";
import SaveIcon from "/save.svg";

type CurrentInputProps = {
  onChange: (v: string) => void;
  value?: string;
  label?: string;
};

type MultiUpdateInputProps = {
  callbackHandler: () => void;
  inputs: CurrentInputProps[];
};

export function MultiUpdateInput({
  callbackHandler,
  inputs,
}: MultiUpdateInputProps) {
  const [isActive, setActive] = useState(false);

  const submit = () => {
    callbackHandler();
    setActive(false);
  };

  return (
    <div className="flex w-full gap-4 items-end">
      {inputs.map((input) => {
        return (
          <div className="w-full">
            {input.label && <label htmlFor={input.label}>{input.label}</label>}
            <input
              className={
                "border px-2 rounded-lg min-h-12 w-full  " +
                (isActive
                  ? "text-black border-gray-900"
                  : "border-gray-400 text-gray-500")
              }
              type="text"
              value={input.value}
              name={input.label}
              id={input.label}
              disabled={!isActive}
              onChange={(e) => input.onChange(e.target.value)}
            />
          </div>
        );
      })}

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
  );
}
