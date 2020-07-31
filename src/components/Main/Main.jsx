import React, { useState, useRef } from "react";
import Buildings from "../Building/Buildings";
import Map from "../Map/Map";

const scrollToSelected = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function Main({ buildings, loading }) {
  const [mapProps, setMapProps] = useState({
    lng: 40.705,
    lat: -73.9215,
    zoom: 11,
  });
  const [bldgSt, setBldg] = useState();
  const [open, setOpen] = useState(false);

  const selectedRef = useRef(null);

  const markerClick = (bldg) => {
    setBldg(bldg);
    if (open) {
      setOpen(false);
    }
    setMapProps({
      lng: parseFloat(bldg.latitude),
      lat: parseFloat(bldg.longitude),
      zoom: 14,
    });
    scrollIt();
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
  };

  const scrollIt = () => {
    scrollToSelected(selectedRef);
  };

  return (
    <div
      className="flex flex-col flex-grow w-screen h-full lg:flex-row"
      style={{ height: `100vh` }}
    >
      {!loading ? (
        <>
          <Buildings
            open={open}
            selected={bldgSt}
            selectedRef={selectedRef}
            markerClick={markerClick}
            buildings={buildings}
            loading={loading}
            bldg={bldgSt}
          />
          <Map
            open={open}
            toggle={toggle}
            markerClick={markerClick}
            building={bldgSt}
            buildings={buildings}
            mapProps={mapProps}
          />
        </>
      ) : (
        <div className="grid grid-cols-1 grid-rows-1 mx-auto my-10">
          <div className="w-20 h-20 ease-linear border-8 border-t-8 rounded-full lg:w-64 lg:h-64 loader"></div>
          <div className="w-20 h-20 ease-linear border-8 border-t-8 rounded-full opacity-75 lg:w-64 lg:h-64 loader2"></div>
        </div>
      )}
    </div>
  );
}
