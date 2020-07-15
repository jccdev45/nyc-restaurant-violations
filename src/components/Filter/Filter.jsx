import React from "react";

export default function Filter({ value, handleChange }) {
  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
