import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "/Users/basavaraj/Desktop/Bus/frontend/src/Components/Map/location-pin.png";

// Create a custom marker icon (optional)
const customIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
const MapUpdater = ({ position }) => {
  const map = useMap(); // Access the map instance
  useEffect(() => {
    if (position && position[0] !== 0 && position[1] !== 0) {
      map.setView(position, map.getZoom()); // Re-center the map
    }
  }, [position, map]);
  return null;
};

const Map = ({ busNumber, socket, position }) => {
  // Use the position prop for the initial state if available, otherwise default to [12, 77]
  const [mapPosition, setMapPosition] = React.useState(position || [12, 77]);
  // console.log(position);

  useEffect(() => {
    if (socket) {
      console.log("Socket exists:", socket.connected);

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", (reason) => {
        console.log("Disconnected from server:", reason);
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      socket.on("location-update", (data) => {
        if (data.latitude && data.longitude) {
          console.log("Received location update:", data);
          setMapPosition([data.latitude, data.longitude]);
        } else {
          console.error("Invalid location data:", data);
        }
      });

      // Cleanup listener on unmount
      return () => {
        socket.off("location-update");
      };
    }
  }, [socket]);

  // You can add a useEffect to update the mapPosition whenever the position prop changes
  useEffect(() => {
    if (position) {
      setMapPosition(position);
    }
  }, [position]);

  return (
    <>
      {mapPosition &&
        mapPosition[0] !== 0 &&
        mapPosition[1] !== 0 &&
        !isNaN(mapPosition[0]) &&
        !isNaN(mapPosition[1]) && (
          <MapContainer
            center={mapPosition}
            zoom={10}
            style={{ height: "400px", width: "100%" }}>
            <MapUpdater position={mapPosition} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={mapPosition} icon={customIcon}>
              <Popup>Bus {busNumber} is here.</Popup>
            </Marker>
          </MapContainer>
        )}
    </>
  );
};

export default Map;
