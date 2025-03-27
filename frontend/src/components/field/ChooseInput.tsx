type ChooseInputProps = {
  label?: string;
  options: any[];
  current?: string;
  onChange: (option: any) => void;
};

export function ChooseInput({
  label,
  options,
  current,
  onChange,
}: ChooseInputProps) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div className="flex border border-gray-600 w-fit">
        {options.map((option, i) => {
          return (
            <div
              key={i}
              className={
                "p-2 px-4 bg-slate-100  hover:bg-slate-300 " +
                (current == option && "bg-slate-400 border")
              }
              onClick={() => onChange(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
}
