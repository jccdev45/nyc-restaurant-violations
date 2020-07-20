import React, { useState, useEffect } from "react";
import Buildings from "../Building/Buildings";
import Map from "../Map/Map";

export default function Main({ buildings, loading }) {
  const [mapProps, setMapProps] = useState({
    lng: 40.705,
    lat: -73.9215,
    zoom: 11,
  });
  const [bldgSt, setBldg] = useState();
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const setInitialState = () => {
  //     setBldg(buildings[0]);
  //   };
  //   setInitialState();
  // }, [buildings]);

  const markerClick = (bldg) => {
    console.log(bldg);
    // toggle()
    setBldg(bldg);
    if (open) {
      setOpen(false);
    }
    setMapProps({
      lng: parseFloat(bldg.latitude),
      lat: parseFloat(bldg.longitude),
      zoom: 14,
    });
    // if (!mapProps) {
    //   setMapProps({
    //     lng: parseFloat(bldg.latitude),
    //     lat: parseFloat(bldg.longitude),
    //     zoom: 14,
    //   });
    // } else {
    //   setMapProps(mapProps);
    // }
    // toggle()
    setOpen(true);
  };

  const toggle = () => {
    setOpen(!open);
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
      {/* <Buildings building={bldg} buildings={buildings} loading={loading} />
      <Map
        openPopup={openPopup}
        onDrag={onDrag}
        markerClick={markerClick}
        building={bldg}
        buildings={buildings}
        mapProps={mapProps}
      /> */}
    </div>
  );
}
