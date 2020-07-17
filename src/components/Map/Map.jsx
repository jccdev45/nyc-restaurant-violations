import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
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

      map.on("load", () => {
        map.addSource(buildings, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          // id:
        });
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

  return (
    <div className="sticky z-10" style={{ top: `86px`}}>
      <div className="container relative">
        <div
          className="absolute bottom-0 left-0 z-10 inline-block p-1 m-5 text-white"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.5)` }}
        >
          <div>
            Longitude: {mapProps.lng} | Latitude: {mapProps.lat} | Zoom:{" "}
            {mapProps.zoom}
          </div>
        </div>
        <div
          className="w-screen lg:h-64"
          ref={(el) => (mapContainer.current = el)}
          style={{ height: `20rem` }}
        />
      </div>
    </div>
  );
}
