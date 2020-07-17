import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
// import { RiMapPin3Line } from "react-icons/ri";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map({ buildings }) {
  const [map, setMap] = useState(null);
  const [mapProps, setMapProps] = useState({
    lng: 40.7799,
    lat: -73.9215,
    zoom: 11,
  });
  const mapContainer = useRef(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [mapProps.lat, mapProps.lng],
        zoom: mapProps.zoom,
      });

      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      map.on("move", () => {
        setMapProps({
          lng: map.getCenter().lng.toFixed(4),
          lat: map.getCenter().lat.toFixed(4),
          zoom: map.getZoom().toFixed(2),
        });
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  // const loadMarkers = () => {
  //   return buildings.length !== 0 ? (
  //     buildings.map((bldg, index) => (
  //       <Marker
  //         key={index}
  //         lat={parseFloat(bldg.latitude)}
  //         lng={parseFloat(bldg.longitude)}
  //       >
  //         <RiMapPin3Line
  //           id={`marker-${index}`}
  //           className={`marker-${index} w-3 h-3 cursor-pointer`}
  //         />
  //       </Marker>
  //     ))
  //   ) : (
  //     <div></div>
  //   );
  // };

  return (
    <div>
      <div className="relative" style={{ zIndex: `-1` }}>
        <div
          className="absolute bottom-0 left-0 inline-block p-1 m-5 text-white"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
        >
          <div>
            Longitude: {mapProps.lng} | Latitude: {mapProps.lat} | Zoom:{" "}
            {mapProps.zoom}
          </div>
        </div>
        <div
          className="h-screen"
          ref={(el) => (mapContainer.current = el)}
          style={{ width: `70vw` }}
        >
          {/* {loadMarkers()} */}
          {/* <Marker>hi i'm a marker</Marker> */}
        </div>
      </div>
    </div>
  );
}
