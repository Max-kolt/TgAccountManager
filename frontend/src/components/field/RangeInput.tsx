type RangeInputProps = {
  min: number;
  max: number;
  first_name?: string;
  second_name?: string;
  default_value: number;
  onChange: (v: number) => void;
  label?: string;
  description?: string;
};

export function RangeInput({
  max,
  min,
  default_value,
  first_name,
  second_name,
  onChange,
  label,
  description,
}: RangeInputProps) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex flex-col items-start">
        <label htmlFor={label}>{label}</label>
        <div className="w-full flex justify-between">
          <span className="text-xs text-gray-500">
            <input
              className="text-xs text-gray-500 p-0 cursor-pointer border w-24"
              value={`${default_value}`}
              type="text"
              onChange={(e) =>
                onChange(
                  !isNaN(parseInt(e.target.value))
                    ? parseInt(e.target.value)
                    : 0
                )
              }
            />

            {second_name && first_name && "%"}
          </span>
          <span className="text-xs text-gray-500">
            {second_name && `${100 - default_value}%`}
          </span>
        </div>
        <input
          className="w-full"
          type="range"
          name={label}
          max={max}
          min={min}
          value={default_value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
      {(first_name || second_name) && (
        <div className="flex w-full justify-between">
          <span className="text-xs text-gray-500">{first_name}</span>
          <span className="text-xs text-gray-500">{second_name}</span>
        </div>
      )}
      {description && (
        <p className="font-extralight w-full text-xs pl-2 pt-1 text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}
