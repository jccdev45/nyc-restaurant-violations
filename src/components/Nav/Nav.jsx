import React from "react";
import Filter from "../Filter/Filter";

export default function Nav({
  value,
  category,
  categories,
  handleChangeCategory,
  handleChangeSearch,
}) {
  return (
    <nav className="p-5 sticky top-0 z-10 flex justify-between items-center bg-gray-300">
      <span className="flex items-center">
        <img
          className="object-cover h-10"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/5/56/NYC_Health.svg/1200px-NYC_Health.svg.png"
          alt=""
        />
        <h2 className="mx-2 uppercase font-bold text-blue-700">
          Restaurant Violations
        </h2>
      </span>
      <Filter
        value={value}
        category={category}
        categories={categories}
        handleChangeCategory={handleChangeCategory}
        handleChangeSearch={handleChangeSearch}
      />
    </nav>
  );
}
