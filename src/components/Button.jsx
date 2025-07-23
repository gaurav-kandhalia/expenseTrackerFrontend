import React from "react";

const Button = ({
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-2xl transition duration-200 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
