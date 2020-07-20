import React, { useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";
import Buildings from "../Building/Buildings";

export default function Map({ buildings, loading }) {
  const [mapProps, setMapProps] = useState({
    lng: 40.705,
    lat: -73.9215,
    zoom: 10,
  });
  const [isOpen, toggleOpen] = useState(false)

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY,
  });

  const showPopup = (bldg) => (
    toggleOpen(!isOpen)
  );

  return (
    <Map
      style="mapbox://styles/mapbox/streets-v11"
      center={[mapProps.lat, mapProps.lng]}
      zoom={[mapProps.zoom]}
      containerStyle={{
        height: `75vh`,
        width: `100vw`,
      }}
    >
      {buildings.length !== 0 ? (
        buildings.map((bldg, index) => (
          <Marker
            key={index}
            coordinates={[
              parseFloat(bldg.longitude),
              parseFloat(bldg.latitude),
            ]}
            onClick={() => showPopup(bldg)}
          >
            <FaMapMarkerAlt
              id={`marker-${index}`}
              className={`marker-${index} w-5 h-5 cursor-pointer`}
            />
          </Marker>
        ))
      ) : (
        <div></div>
      )}
      <Buildings loading={loading} buildings={buildings} />
    </Map>
  );
}
