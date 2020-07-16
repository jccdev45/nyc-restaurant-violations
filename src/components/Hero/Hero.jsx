import React from "react";

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1512749355846-eb142b5cc4a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80)`,
        backgroundSize: `cover`,
        // height: `30rem`,
      }}
      className="lg:h-auto flex items-center sm:contain"
    >
      <div className="w-3/4 my-5 mx-auto px-3 py-10 flex flex-col container rounded text-center bg-gray-200">
        <span className="w-full lg:w-3/4 mx-auto p-2 lg:p-10 flex flex-col text-center text-blue-400 border-b-2 border-blue-500">
          <div className="text-2xl font-bold">
            Welcome to NYC Health Inspections & Violations Search
          </div>
          <div className="text-lg">
            Find out just how dirty your favorite restaurant is but don't let it
            stop you from living your best, filthy life you animal.
          </div>
        </span>
        <ul className="flex-col lg:flex-row flex-wrap justify-center break-normal text-left list-inside mx-auto list-disc text-xl">
          <li className="mx-5 sm:w-full">N - Not Yet Graded</li>
          <li className="mx-5 sm:w-full">N/A - No Grade Found</li>
          <li className="mx-5 sm:w-full">A/B/C - Self-Explanatory</li>
          <li className="mx-5 sm:w-full">Z - Grade Pending</li>
          <li className="mx-5 sm:w-full">
            P - "Grade Pending" issued on re-opening following an inspection
            that resulted in a closure
          </li>
        </ul>
      </div>
    </div>
  );
}
