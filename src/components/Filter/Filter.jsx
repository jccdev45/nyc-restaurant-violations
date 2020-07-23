import React from "react";

export default function Filter({ value, handleChange, handleSubmit }) {
  return (
    <form action="" className="flex w-full max-w-sm ml-10">
      <div className="flex items-center p-1 border-b-2 border-blue-400">
        <input
          className="w-full px-5 py-2 mx-1 leading-tight text-gray-700 bg-transparent rounded appearance-none focus:outline-none focus:bg-white"
          placeholder="Search"
          type="text"
          name="$q="
          value={value}
          onChange={handleChange}
        />
        <input
          className="px-5 py-1 mb-0 text-white transition duration-100 ease-in-out bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleSubmit}
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
}
