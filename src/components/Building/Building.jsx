import React from "react";
import { cleanItUp, dateClean } from "../../utility/sanitize";

export default function Building({
  markerClick,
  selected,
  selectedRef,
  current,
  total,
  bldg,
}) {
  let {
    boro,
    building,
    critical_flag,
    dba,
    grade,
    inspection_date,
    street,
    zipcode,
  } = bldg;

  function clickMarker() {
    markerClick(bldg);
  }

  const selectedStyle = {
    border: `2px solid blue`,
    backgroundColor: `rgba(0, 0, 100, 0.1)`,
    minWidth: `65%`,
  };

  const cardStyle = {
    minWidth: `65%`,
  };

  return (
    <div
      className="flex flex-col justify-between h-full px-2 mx-2 my-auto transition duration-100 ease-in-out bg-white border-2 border-gray-200 border-solid rounded shadow-lg cursor-pointer min-w-2/3 lg:h-64 lg:py-3 lg:my-3 lg:px-5 md:min-w-1/2 lg:w-full lg:mx-auto hover:border-blue-600 hover:bg-transparent"
      style={selected === bldg ? selectedStyle : cardStyle}
      onClick={clickMarker}
      ref={selectedRef}
    >
      <div className="flex items-center justify-between w-full">
        <span>
          {critical_flag === "N" ? null : (
            <img
              src="https://freesvg.org/img/a14.png"
              alt="Critical"
              className="w-10 h-auto"
            />
          )}
        </span>
        <span>{dateClean(inspection_date)}</span>
      </div>
      <div className="flex items-center justify-between w-full">
        <div
          className={grade ? "text-blue-400 text-6xl" : "text-red-200 text-4xl"}
        >
          {grade ? grade : "N/A"}
        </div>
        <div className="text-xl font-bold text-right">{dba}</div>
        {/* <div className="text-xl font-bold text-right">{cleanItUp(dba)}</div> */}
      </div>
      <div className="flex flex-col justify-end w-full text-right">
        <div className="text-lg">
          {`${building} `} {cleanItUp(street)}
        </div>
        <div className="text-lg">{` ${boro}, ${zipcode}`}</div>
      </div>
      <div className="flex items-center justify-between w-full text-2xl">
        <span>
          <span className="mx-1 text-blue-300">{current + 1} of</span>
          <span className="text-blue-500">{total}</span>
        </span>
      </div>
    </div>
  );
}
