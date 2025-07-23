import React from "react";

const InputField = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`border-2 border-green-300 p-2 rounded-2xl w-1/2 ${className}`}
    />
  );
};

export default InputField;
