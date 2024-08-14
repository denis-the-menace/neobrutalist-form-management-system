import React from "react";
import clsx from "clsx";

export default function PageWrapper({
  children,
  className,
  isContainer = true,
}) {
  return (
    <div
      className={clsx(
        "transition ease duration-300 mx-auto p-8 mb-40 bg-primary-light border-primary-dark border-2 rounded-[2rem] solid-shadow",
        isContainer && "container",
        className,
      )}
    >
      {children}
    </div>
  );
}
