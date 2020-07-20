import React from "react";
import Building from "./Building";

export default function Buildings({ loading, selected, buildings, markerClick }) {
  return (
    <div
      className="sticky z-10 flex justify-start w-1/4 h-full px-2 overflow-scroll bg-gray-100 lg:flex-col"
      style={{ top: `1%` }}
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
