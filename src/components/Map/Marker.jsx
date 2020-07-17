import React from "react";
import { RiMapPin3Line } from "react-icons/ri";

const Marker = ({ id }) => (
  <RiMapPin3Line
    id={`marker-${id}`}
    className={`marker-${id} w-3 h-3 cursor-pointer`}
  />
);

export default Marker;
