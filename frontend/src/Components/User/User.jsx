import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "/Users/basavaraj/Desktop/Bus/frontend/src/Components/Map/location-pin.png";

const customIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const User = () => {
  const { busNumber } = useParams(); // Get the bus number from the URL
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null); // Set initial data state to null

  // Fetch bus data including latitude and longitude
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/getLocation/${busNumber}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching bus data: ", error);
      }
    };

    fetchdata();
  }, [busNumber]);

  // Initialize map and markers once data is available
  useEffect(() => {
    if (data) {
      const map = L.map("map").setView([data.latitude, data.longitude], 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add marker for the bus location
      L.marker([data.latitude, data.longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`Bus Number: ${data.number}`); // Popup with bus number

      // Clean up the map on unmount
      return () => {
        map.remove();
      };
    }
  }, [data]); // Depend on data instead of latitude and longitude

  // Fetch bus stops
  useEffect(() => {
    const fetchStops = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/stops/${busNumber}`
        );
        setStops(response.data.stop);
      } catch (error) {
        console.error("Error fetching stops:", error);
        setError("Failed to load bus stops");
      } finally {
        setLoading(false);
      }
    };

    fetchStops();
  }, [busNumber]);

  return (
    <>
      <div
        id="map"
        className="h-[400px]"
        style={{ height: "400px", width: "100%" }}></div>

      <div className="flex flex-col justify-center items-center h-max w-full">
        <h1 className="text-center text-2xl font-extrabold mb-8">
          Bus Stops for Bus {busNumber}
        </h1>
        <div className="relative w-full max-w-lg">
          {loading ? (
            <p>Loading stops...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : stops.length > 0 ? (
            <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-2 bg-blue-400 rounded-md"></div>
          ) : (
            <p>No stops available.</p>
          )}

          <ul className="space-y-12">
            {stops.length > 0 ? (
              stops.map((stop, index) => (
                <div
                  className="flex justify-center items-center relative"
                  key={index}>
                  <span
                    className={`h-10 w-10 rounded-full flex items-center justify-center relative z-10 ${
                      stop.reached ? "bg-green-500" : "bg-blue-500"
                    }`}>
                    {stop.reached ? "✓" : index + 1}
                  </span>
                  <li
                    className={`ml-8 px-6 py-4 rounded-md shadow-md font-bold text-lg ${
                      stop.reached ? "bg-green-200" : "bg-blue-200"
                    }`}>
                    {stop.stopname}
                  </li>
                </div>
              ))
            ) : (
              <li className="font-bold text-center">No stops available.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default User;
