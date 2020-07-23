import React from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapIcon from "../../assets/map-icon.png";
import Modal from "../Modal/Modal";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY,
});

export default function Map({
  building,
  buildings,
  open,
  toggle,
  markerClick,
  mapProps,
}) {
  function clickMarker(building) {
    markerClick(building);
  }

  return (
    <Mapbox
      style={`mapbox://styles/mapbox/streets-v11`}
      center={[mapProps.lat, mapProps.lng]}
      zoom={[mapProps.zoom]}
      containerStyle={{
        width: `100vw`,
      }}
      className="h-full"
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
              alt={bldg.dba}
              className="w-5 h-5 transition duration-500 ease-in-out rounded-full cursor-pointer hover:bg-blue-400"
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
          className="w-3/4 h-full overflow-y-scroll lg:h-full"
        >
          <Modal bldg={building} toggle={toggle} />
        </Popup>
      )}
    </Mapbox>
  );
}
