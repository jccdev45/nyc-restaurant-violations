import React, { useState } from "react";
import Buildings from "../Building/Buildings";
import Map from "../Map/Map";

export default function Main({ buildings, loading }) {
  const [mapProps, setMapProps] = useState({
    lng: 40.705,
    lat: -73.9215,
    zoom: 11,
  });
  const [bldg, setBldg] = useState(null);

  const markerClick = (bldg) => {
    setBldg(null);
    setMapProps({
      lng: parseFloat(bldg.latitude),
      lat: parseFloat(bldg.longitude),
      zoom: 15,
    });
    setBldg(bldg);
  };

  const openPopup = () => {
    setBldg(null);
  };

  const onDrag = () => {
    if (bldg) {
      setBldg(null);
    }
  };

  return (
    <div className="flex flex-grow w-screen" style={{ height: `1032px` }}>
      {!loading ? (
        <>
          <Buildings
            markerClick={markerClick}
            buildings={buildings}
            loading={loading}
            building={bldg}
          />
          <Map
            openPopup={openPopup}
            onDrag={onDrag}
            markerClick={markerClick}
            building={bldg}
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
