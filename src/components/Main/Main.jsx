import React, { useState } from "react";
import Buildings from "../Building/Buildings";
import Map from "../Map/Map";

export default function Main({ buildings, loading }) {
  const [mapProps, setMapProps] = useState({
    lng: 40.705,
    lat: -73.9215,
    zoom: 10.5,
  });
  const [bldg, setBldg] = useState(null);

  const markerClick = (bldg) => {
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
      <Buildings building={bldg} buildings={buildings} loading={loading} />
      <Map
        openPopup={openPopup}
        onDrag={onDrag}
        markerClick={markerClick}
        building={bldg}
        buildings={buildings}
        mapProps={mapProps}
      />
    </div>
  );
}
