import React from "react";
import Building from "./Building";

export default function Buildings({
  loading,
  selected,
  buildings,
  markerClick,
}) {
  return (
    <div
      className="flex w-screen px-2 py-5 overflow-x-scroll overflow-y-hidden bg-gray-100 lg:overflow-auto lg:sticky lg:w-1/4 lg:h-1/4 lg:flex-col"
      style={{ minHeight: `300px` }}
    >
      {buildings.map((bldg, index) => (
        <Building
          key={index}
          current={index}
          selected={selected}
          loading={loading}
          bldg={bldg}
          total={buildings.length}
          markerClick={markerClick}
        />
      ))}
    </div>
  );
}
