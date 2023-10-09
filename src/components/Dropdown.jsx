import React from "react";

const Dropdown = ({ value, onChange }) => {
  const options = [1, 2, 3, 4, 5];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full min-w-20 rounded-md md:w-auto focus:outline-none focus:border-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
