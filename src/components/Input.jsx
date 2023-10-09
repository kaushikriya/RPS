import React from "react";

const Input = ({ id, placeholder, value, onChange }) => {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className="border p-2 rounded-md w-full md:w-auto"
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
