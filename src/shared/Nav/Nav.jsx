import React from "react";
import Filter from "./Filter/Filter";

export default function Nav({ value, handleChange, handleSubmit }) {
  return (
    <nav className="sticky top-0 z-20 flex items-center justify-between p-5 bg-gray-300">
      <span>
        <a href="/" className="flex items-center">
          <img
            className="object-cover h-10"
            src="https://qns.com/wp-content/uploads/2019/12/nyc-health-logo.png"
            alt=""
          />
          <h2 className="hidden mx-2 font-bold text-blue-700 uppercase lg:block">
            Restaurant Violations
          </h2>
        </a>
      </span>
      <Filter
        value={value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </nav>
  );
}
