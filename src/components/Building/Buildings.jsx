import React, { useState } from "react";
import Building from "./Building";

export default function Buildings({ buildings }) {
  const [filtered, setFiltered] = useState(buildings);

  const handleChange = (e) => {
    let defaultList = buildings.map((building) => {
      return {
        action: building.action,
        boro: building.boro,
        building: building.building,
        critical: building.critical_flag,
        cuisine: building.cuisine_description,
        dba: building.dba.toLowerCase(),
        grade: building.grade,
        grade_date: building.grade_date,
        inspection_date: building.inspection_date,
        inspection_type: building.inspection_type,
        lat: building.latitude,
        lng: building.longitude,
        phone: building.phone,
        record_date: building.record_date,
        score: building.score,
        street: building.street,
        violation_code: building.violation_code,
        violation_description: building.violation_description,
        zip: building.zipcode,
      };
    });

    if (e !== "") {
      let newList = [];
      newList = defaultList.filter((building) =>
        building.dba.includes(e.toLowerCase())
      );
      setFiltered(newList);
    } else {
      setFiltered(buildings);
    }
  };

  return (
    <>
      <input
        type="text"
        className="border-2 border-solid border-black"
        onChange={(e) => handleChange(e.target.value)}
      />
      {filtered.length
        ? filtered.map((building, index) => (
            <Building key={index} building={building} />
          ))
        : buildings.map((building, index) => (
            <Building key={index} building={building} />
          ))}
    </>
  );
}
