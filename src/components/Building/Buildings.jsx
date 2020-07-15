import React from "react";
import Building from "./Building";

export default function Buildings({ buildings }) {
  return (
    <div className="relative container mx-auto flex flex-col justify-center">
      {buildings.length > 1 ? (
        buildings.map((building, index) => (
          <Building key={index} building={building} />
        ))
      ) : (
        <div className="static container text-center bg-gray-200">
          <img
            className="object-cover h-64 w-full"
            src="https://images.unsplash.com/photo-1512749355846-eb142b5cc4a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80"
            alt=""
          />
          <span className="absolute inset-x-0 bottom-0 bg-gray-500">Please enter a search term</span>
        </div>
      )}
    </div>
  );
}
