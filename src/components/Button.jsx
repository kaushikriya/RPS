import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="text-lg bg-blue-800 text-white p-2 rounded-md focus:outline-none"
    >
      {children}
    </button>
  );
};

export default Button;
