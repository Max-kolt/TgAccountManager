type DefaultInputProps = {
  onChange: (v: string) => void;
  label: string;
  required?: boolean;
  discription?: string;
};

export function DefaultInput({
  onChange,
  label,
  required,
  discription,
}: DefaultInputProps) {
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
        name={label}
        type="text"
        required={required}
      />
      {discription && (
        <p className="font-extralight text-xs pl-2 pt-1 text-gray-500">
          {discription}
        </p>
      )}
    </div>
  );
}
