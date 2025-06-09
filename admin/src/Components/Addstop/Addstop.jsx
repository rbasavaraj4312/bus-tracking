// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const Addstop = () => {
//   const [stopName, setStopName] = useState("");
//   const [latitude, setlatitude] = useState("");
//   const [longitude, setlongitude] = useState("");
//   const { busNumber } = useParams();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "latitude" || name === "longitude") {
//       const numericValue = parseFloat(value) || "";
//       if (name === "latitude") setlatitude(numericValue);
//       if (name === "longitude") setlongitude(numericValue);
//     } else {
//       setStopName(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       latitude < -90 ||
//       latitude > 90 ||
//       longitude < -180 ||
//       longitude > 180
//     ) {
//       alert("Invalid latitude or longitude");
//       return;
//     }

//     try {
//       await axios.post(`http://localhost:4000/addstop/${busNumber}`, {
//         stopName,
//         latitude,
//         longitude,
//       });
//       alert(`${stopName} stop added successfully!`);
//       setStopName("");
//       setlatitude("");
//       setlongitude("");
//       navigate(`/stops/${busNumber}`);
//     } catch (error) {
//       console.error("Error adding the stop:", error);
//       alert("Failed to add stop. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const map = L.map("map").setView([latitude || 0, longitude || 0], 10);
//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//       attribution:
//         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//     }).addTo(map);

//     map.on("click", (e) => {
//       const { lat, lng } = e.latlng;
//       setlatitude(lat.toFixed(6));
//       setlongitude(lng.toFixed(6));
//     });

//     return () => {
//       map.remove();
//     };
//   }, [latitude, longitude]);

//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div
//         id="map"
//         className="h-[400px]"
//         style={{ height: "400px", width: "100%" }}></div>
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="text-center text-2xl font-bold">
//           Add Stop for Bus {busNumber}
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="text"
//               name="stopName"
//               value={stopName}
//               id="floating_stopname"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               placeholder=" "
//               required
//               onChange={handleChange}
//             />
//             <label
//               htmlFor="stopName"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//               Stop Name
//             </label>
//           </div>

//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="number"
//               name="latitude"
//               value={latitude}
//               id="floating_latitude"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               placeholder=" "

//               required
//               onChange={handleChange}
//             />
//             <label
//               htmlFor="latitude"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//               Latitude
//             </label>
//           </div>

//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               type="number"
//               name="longitude"
//               value={longitude}
//               id="floating_longitude"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               placeholder=" "

//               required
//               onChange={handleChange}
//             />
//             <label
//               htmlFor="longitude"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
//               Longitude
//             </label>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded">
//             Add Stop +
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addstop;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const Addstop = () => {
  const [stopName, setStopName] = useState("");
  const [latitude, setLatitude] = useState(20.5937); // Default (India)
  const [longitude, setLongitude] = useState(78.9629);
  const { busNumber } = useParams();
  const navigate = useNavigate();

  const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Default Leaflet icon size
    iconAnchor: [12, 41], // Position the icon correctly on the map
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    const map = L.map("map").setView([latitude, longitude], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([latitude, longitude], {
      draggable: true,
      icon: customIcon, // Use the fixed icon
    }).addTo(map);

    // Update state when marker is dragged
    marker.on("dragend", (e) => {
      const { lat, lng } = e.target.getLatLng();
      setLatitude(lat.toFixed(6));
      setLongitude(lng.toFixed(6));
    });

    // Update state when map is clicked
    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setLatitude(lat.toFixed(6));
      setLongitude(lng.toFixed(6));
      marker.setLatLng([lat, lng]);
    });

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  // Fetch location from stop name
  const fetchLocation = async (stop) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${stop}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLatitude(parseFloat(lat));
        setLongitude(parseFloat(lon));
      }
      // else {
      //   alert("Location not found. Please enter a valid stop name.");
      // }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleStopNameChange = (e) => {
    setStopName(e.target.value);
    if (e.target.value.length > 2) {
      fetchLocation(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      alert("Invalid latitude or longitude");
      return;
    }

    try {
      await axios.post(`http://localhost:4000/addstop/${busNumber}`, {
        stopName,
        latitude,
        longitude,
      });
      alert(`${stopName} stop added successfully!`);
      setStopName("");
      setLatitude(20.5937);
      setLongitude(78.9629);
      navigate(`/stops/${busNumber}`);
    } catch (error) {
      console.error("Error adding the stop:", error);
      alert("Failed to add stop. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div
        id="map"
        className="h-[400px]"
        style={{ height: "400px", width: "100%" }}></div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold">
          Add Stop for Bus {busNumber}
        </h2>
        <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="stopName"
              value={stopName}
              id="floating_stopname"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={handleStopNameChange}
            />
            <label
              htmlFor="stopName"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Stop Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="latitude"
              value={latitude}
              id="floating_latitude"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setLatitude(parseFloat(e.target.value) || "")}
            />
            <label
              htmlFor="latitude"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Latitude
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="longitude"
              value={longitude}
              id="floating_longitude"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              onChange={(e) => setLongitude(parseFloat(e.target.value) || "")}
            />
            <label
              htmlFor="longitude"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Longitude
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded">
            Add Stop +
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addstop;
