import React from "react";
import Building from "./Building";

export default function Buildings({ buildings }) {
  return (
    <div className="container mx-auto flex flex-wrap justify-center">
      <img
        className="object-cover h-64 w-full"
        src="https://images.unsplash.com/photo-1512749355846-eb142b5cc4a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80"
        alt=""
      />
      {buildings.length > 1 ? (
        buildings.map((building, index) => (
          <Building key={index} current={index} building={building} total={buildings.length} />
        ))
      ) : (
        <div className="my-20 mx-5 p-10 container rounded text-center bg-gray-200">
          <span className="text-2xl bg-gray-300">
            Welcome to NYC Health Inspections & Violations Search. Please enter
            a restaurant name.
          </span>
        </div>
      )}
    </div>
  );
}
