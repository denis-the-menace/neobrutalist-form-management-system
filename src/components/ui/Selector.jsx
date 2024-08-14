export default function Selector({
  label,
  placeholder,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        className="capitalize block font-bold text-primary-dark"
        htmlFor={label}
      >
        {placeholder}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="cursor-pointer bg-primary-light text-primary-dark w-full p-2 border-2 border-primary-dark rounded transition ease duration-300"
        style={{ boxShadow: "2.5px 3px 0 var(--color-primary-dark)" }}
      >
        <option>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
