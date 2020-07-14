import React from "react";

export default function Building({ building }) {
  return (
    <div className="flex flex-col items-center m-5 border-solid border-2 border-gray-200">
      {building.dba}
    </div>
  );
}
