import { useState } from "react";
import clsx from "clsx";

export default function Button({
  children,
  className,
  bgColor,
  hoverColor,
  activeColor,
  hasShadow = true,
  ...props
}) {
  const defaultBoxShadow = hasShadow ? "5px 5px 0px var(--color-primary-dark)" : "none";
  const [boxShadow, setBoxShadow] = useState(defaultBoxShadow);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={clsx(
        "inline-block font-bold text-primary-dark text-center border-2 border-primary-dark rounded-[1rem] transition-all duration-300 ease cursor-pointer",
        isHovered ? hoverColor : bgColor, // Apply hover color if hovered
        className
      )}
      style={{ boxShadow }}
      onMouseDown={() => {
        if (hasShadow) setBoxShadow("3px 3px 0 var(--color-primary-dark)");
      }}
      onMouseUp={() => {
        if (hasShadow) setBoxShadow("5px 5px 0 var(--color-primary-dark)");
      }}
      onMouseEnter={() => {
        if (hasShadow) setBoxShadow("7px 7px 0 var(--color-primary-dark)");
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (hasShadow) setBoxShadow("5px 5px 0 var(--color-primary-dark)");
        setIsHovered(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

