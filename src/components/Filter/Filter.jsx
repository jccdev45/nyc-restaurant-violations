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
      <div className="flex items-center border-b border-b-2 border-blue-200 py-2">
        <input
          className="shadow appearance-none rounded w-full py-2 px-5 text-gray-700 leading-tight focus:outline-none"
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleSearchInputChanges}
        />
        <input onClick={callSearch} type="submit" value="Submit" />
      </div>
    </form>
  );
}
