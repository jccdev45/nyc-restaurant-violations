import React, { useState } from "react";

export default function Filter({ handleSubmit }) {
  const [search, setSearch] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearch(e.target.value);
  };

  const reset = () => {
    setSearch("");
  };

  const callSearch = (e) => {
    e.preventDefault();
    handleSubmit(search);
    reset();
  };

  return (
    <form action="" className="w-full max-w-sm flex">
      <div className="p-1 flex items-center border-b border-b-2 border-blue-400">
        <input
          className="mx-1 py-2 rounded appearance-none bg-transparent w-full px-5 text-gray-700 leading-tight focus:outline-none focus:bg-white"
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleSearchInputChanges}
        />
        <input
          className="mb-0 py-1 px-5 rounded bg-blue-500 text-white"
          onClick={callSearch}
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
}
