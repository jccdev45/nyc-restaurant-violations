import React from "react";
import { cleanItUp, listifyDesc } from "../../utility/sanitize";

export default function Modal({ bldg, toggle }) {
  let {
    action,
    // boro,
    // building,
    // critical_flag,
    cuisine,
    // dba,
    // grade,
    // inspection_date,
    inspection_type,
    // street,
    violation_description,
    // zipcode,
  } = bldg;

  return (
    <div className="flex flex-col items-center w-full h-full p-5 overflow-y-auto bg-white rounded">
      {/* <div className="flex items-center justify-between w-full">
        <div
          className={grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"}
        >
          {grade ? grade : "N/A"}
        </div>
        <div className="text-xl font-bold">{cleanItUp(dba)}</div>
      </div> */}
      <div className="flex justify-startw-full">
        <div className="flex">
          {cuisine ? cuisine : "No cuisine type listed"}
        </div>
        {/* <div className="flex flex-col w-full text-right">
          <div className="text-lg">
            {`${building} `} {cleanItUp(street)}
          </div>
          <div className="text-lg">{` ${boro}, ${zipcode}`}</div>
        </div> */}
      </div>
      <div className="text-lg">{`${inspection_type}`}</div>
      <h3>{`${action}`}</h3>

      <ul className="list-disc list-inside">
        {listifyDesc(violation_description)}
      </ul>
      <button
        onClick={toggle}
        className="px-5 py-3 text-white bg-blue-500 rounded"
        style={{ transition: `all .15s ease-in-out ` }}
      >
        Close
      </button>
    </div>
  );
}
