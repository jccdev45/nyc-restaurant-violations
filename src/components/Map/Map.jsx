import React from "react";
import ReactMapboxGl, { Marker, Layer, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaMapMarkerAlt } from "react-icons/fa";
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
      {/* <Layer type="symbol" id="marker" layout={{ "icon-image": mapIcon }}> */}
      {buildings.length !== 0 ? (
        buildings.map((bldg, index) => (
          // <Feature
          //   key={index}
          //   coordinates={[
          //     parseFloat(bldg.longitude),
          //     parseFloat(bldg.latitude),
          //   ]}
          //   onClick={() => markerClick(bldg)}
          // />
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
              className="cursor-pointer w-5 h-5 hover:w-8 hover:h-8 hover:bg-blue-400 rounded-full"
            />
            {/* <FaMapMarkerAlt
                id={`marker-${index}`}
                className={`marker-${index} w-5 h-5 cursor-pointer`}
              /> */}
          </Marker>
        ))
      ) : (
        <div></div>
      )}
      {/* </Layer> */}
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
      {/* <Buildings loading={loading} buildings={buildings} /> */}
    </Map>
  );
}
