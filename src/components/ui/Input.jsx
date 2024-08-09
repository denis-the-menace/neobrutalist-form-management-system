import { useState } from "react";
import clsx from "clsx";

export default function Input({
  children,
  className,
  type,
  value,
  onChange,
  readOnly = false,
  ...props
}) {
  const [boxShadow, setBoxShadow] = useState(
    "2.5px 3px 0 var(--color-primary-dark)"
  );

  return (
    <div>
      <label
        htmlFor={type}
        className="capitalize block font-bold text-primary-dark"
      >
        {type}
      </label>
      <input
        type={type}
        id={type}
        name={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly} // Adding the readOnly prop
        className={clsx(
          "bg-primary-light text-primary-dark font-sans p-2 border-2 border-primary-dark rounded-md outline-none transition ease duration-300",
          className
        )}
        style={{ boxShadow }}
        onFocus={() => !readOnly && setBoxShadow("5.5px 7px 0 var(--color-primary-dark)")}
        onBlur={() => !readOnly && setBoxShadow("2.5px 3px 0 var(--color-primary-dark)")}
        {...props}
      />
      {children}
    </div>
  );
}
