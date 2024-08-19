type CheckboxInputProps = {
  callbackHandler: (v: boolean) => void;
  label?: string;
};

export function CheckboxInput({ callbackHandler, label }: CheckboxInputProps) {
  return (
    <div className="flex items-center">
      <input
        name={label}
        id={label}
        type="checkbox"
        className="border-black hover:bg-slate-500 mr-2 checked:bg-blue-500"
        onClick={(e) => callbackHandler(e.currentTarget.checked)}
      />
      <label htmlFor={label}> {label}</label>
    </div>
  );
}
