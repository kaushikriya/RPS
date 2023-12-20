import React from "react";

const Dropdown = ({ value, onChange }) => {
  const options = {
    0: "Rock",
    1: "Paper",
    2: "Scissor",
    3: "Lizard",
    4: "Spock",
  };

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 w-full min-w-20 rounded-md md:w-auto focus:outline-none focus:border-blue-500"
    >
      {Object.keys(options).map((option) => (
        <option key={option} value={option}>
          {options[option]}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
