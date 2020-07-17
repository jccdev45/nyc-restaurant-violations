import React from "react";
import Building from "./Building";

export default function Buildings({ loading, buildings }) {
  return (
    <div className="container flex flex-wrap justify-center w-screen mx-auto">
      {!loading ? (
        buildings.map((building, index) => (
          <Building
            key={index}
            current={index}
            loading={loading}
            bldg={building}
            total={buildings.length}
          />
        ))
      ) : (
        <div className="grid grid-cols-1 grid-rows-1">
          <div className="w-20 h-20 ease-linear border-8 border-t-8 rounded-full lg:w-64 lg:h-64 loader"></div>
          <div className="w-20 h-20 ease-linear border-8 border-t-8 rounded-full opacity-75 lg:w-64 lg:h-64 loader2"></div>
        </div>
      )}
    </div>
  );
}
