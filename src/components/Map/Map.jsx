import React from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapIcon from "../../assets/map-icon.png";

export default function Map({
  building,
  buildings,
  openPopup,
  onDrag,
  markerClick,
  mapProps,
}) {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

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
            onClick={() => markerClick(bldg)}
          >
            <img
              src={mapIcon}
              className="w-5 h-5 rounded-full cursor-pointer hover:w-8 hover:h-8 hover:bg-blue-400"
            />
          </Marker>
        ))
      ) : (
        <div></div>
      )}
      {building && (
        <Popup
          anchor="top"
          coordinates={[
            parseFloat(building.longitude),
            parseFloat(building.latitude),
          ]}
          onClick={() => openPopup()}
        >
          {building.dba}
        </Popup>
      )}
    </Map>
  );
}
