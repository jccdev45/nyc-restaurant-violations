import React, { useState } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapIcon from "../../assets/map-icon.png";

export default function Map({
  building,
  buildings,
  // openPopup,
  onDrag,
  markerClick,
  mapProps,
}) {
  const [open, setOpen] = useState(false);

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

  const clickMarker = (bldg) => {
    markerClick(bldg);
    togglePopup();
  };

  const togglePopup = () => {
    // openPopup()
    setOpen(!open);
  };

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      center={[mapProps.lat, mapProps.lng]}
      zoom={[mapProps.zoom]}
      containerStyle={{
        maxHeight: `auto`,
        width: `100vw`,
      }}
      onDrag={onDrag}
    >
      {buildings.length !== 0 ? (
        buildings.map((bldg, index) => (
          <Marker
            key={index}
            coordinates={[
              parseFloat(bldg.longitude),
              parseFloat(bldg.latitude),
            ]}
            onClick={() => clickMarker(bldg)}
          >
            <img
              src={mapIcon}
              className="w-8 transition duration-500 ease-in-out rounded-full cursor-pointer h-w-8 hover:bg-blue-400"
            />
          </Marker>
        ))
      ) : (
        <div></div>
      )}
      {open && (
        <Popup
          anchor="top"
          coordinates={[
            parseFloat(building.longitude),
            parseFloat(building.latitude),
          ]}
          // onClick={() => openPopup()}
        >
          {building.dba}
        </Popup>
      )}
    </Map>
  );
}
