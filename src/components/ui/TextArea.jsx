import { useState } from "react";
import clsx from "clsx";

export default function TextArea({
  children,
  className,
  value,
  onChange,
  maxLength,
}) {
  const [boxShadow, setBoxShadow] = useState(
    "2.5px 3px 0 var(--color-primary-dark)"
  );

  return (
    <div>
      <label
        htmlFor="textarea"
        className="capitalize block text-lg font-bold text-primary-dark mb-2"
      >
        Message
      </label>
      <textarea
        id="textarea"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={clsx(
          "bg-primary-light text-primary-dark w-full max-h-[10rem] font-sans p-2 border-2 border-primary-dark rounded-md outline-none transition ease duration-300 resize-none",
          className
        )}
        style={{ boxShadow }}
        onFocus={() => setBoxShadow("5.5px 7px 0 var(--color-primary-dark)")}
        onBlur={() => setBoxShadow("2.5px 3px 0 var(--color-primary-dark)")}
      />
      {children}
    </div>
  );
}
