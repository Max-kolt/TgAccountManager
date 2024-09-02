import { useState } from "react";
import EyeIcon from "/eye.svg";

type PasswordInputProps = {
  onChange: (v: string) => void;
  value?: string;
  required?: boolean;
};

export function PasswordInput({
  onChange,
  required,
  value,
}: PasswordInputProps) {
  const [view, setView] = useState(false);

  return (
    <div>
      <label htmlFor="password">
        Пароль {required && <span className="text-red-600"> *</span>}
      </label>
      <div className="relative w-full flex items-center">
        <input
          className="border w-full border-neutral-950 p-1 rounded-lg"
          onChange={(value) => onChange(value.target.value)}
          type={!view ? "password" : "text"}
          name="password"
          id="password"
          autoComplete="off"
          value={value}
          required={required}
        />
        <img
          src={EyeIcon}
          alt="view"
          className="absolute right-1 bg-white rounded-lg"
          onClick={() => setView(!view)}
        />
      </div>
    </div>
  );
}
