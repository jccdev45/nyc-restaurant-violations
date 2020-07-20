import React from "react";

export default function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1512749355846-eb142b5cc4a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2851&q=80)`,
        backgroundSize: `cover`,
        // height: `30rem`,
      }}
      className="flex items-center lg:h-auto sm:contain"
    >
      <div className="container flex flex-col w-3/4 px-3 py-10 mx-auto my-5 text-center bg-gray-200 rounded">
        <span className="flex flex-col w-full p-2 mx-auto text-center text-blue-400 border-b-2 border-blue-500 lg:w-3/4 lg:p-10">
          <div className="text-2xl font-bold">
            Welcome to NYC Health Inspections & Violations Search
          </div>
          <div className="text-lg">
            Find out just how dirty your favorite restaurant is but don't let it
            stop you from living your best, filthy life you animal.
          </div>
        </span>
        <ul className="flex-col justify-center mx-auto text-xl text-left break-normal list-disc list-inside">
          <li className="mx-5">N - Not Yet Graded</li>
          <li className="mx-5">N/A - No Grade Found</li>
          <li className="mx-5">A/B/C - Self-Explanatory</li>
          <li className="mx-5">Z - Grade Pending</li>
          <li className="mx-5">
            P - "Grade Pending" issued on re-opening following an inspection
            that resulted in a closure
          </li>
        </ul>
      </div>
    </div>
  );
}
