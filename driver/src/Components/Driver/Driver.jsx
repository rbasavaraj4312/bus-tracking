import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const Driver = () => {
  const { busNumber } = useParams();
  const [stops, setStops] = useState([]);
  const [socket, setSocket] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server: " + socket);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason);
    });

    newSocket.on("reconnect_attempt", (attempt) => {
      console.log(`Reconnecting... Attempt #${attempt}`);
    });

    const fetchStops = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/stops/${busNumber}`
        );
        setStops(response.data.stop);
      } catch (error) {
        console.error("Error fetching stops:", error);
      }
    };

    fetchStops();

    const updateLocationAndEmit = () => {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLat(latitude);
          setLong(longitude);
          console.log(`${lat}, ${long}`);

          if (newSocket) {
            newSocket.emit("location-update", { latitude, longitude });
          }

          axios
            .put(`http://localhost:4000/updateLocation/${busNumber}`, {
              latitude,
              longitude,
            })
            .then((response) => {
              console.log(response.data.message);
            })
            .catch((error) => {
              console.error("Error updating location:", error);
            });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Permission to access location was denied.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert(
                "Location information is unavailable. Ensure your device has a good network or GPS signal."
              );
              break;
            case error.TIMEOUT:
              alert(
                "The request to get your location timed out. Please try again."
              );
              break;
            default:
              alert("An unknown error occurred.");
              break;
          }
        },
        {
          enableHighAccuracy: true, 
          timeout: 5000, 
          maximumAge: 0, 
        }
      );
    };


    const intervalId = setInterval(updateLocationAndEmit, 5000);

    updateLocationAndEmit();

    return () => {
      clearInterval(intervalId);
      newSocket.disconnect();
    };
  }, [busNumber]);

  const updateStopStatus = async (stopId, currentStatus) => {
    try {
      await axios.put(`http://localhost:4000/updatestop/${stopId}`, {
        reached: !currentStatus,
      });
      setStops((prevStops) =>
        prevStops.map((stop) =>
          stop._id === stopId ? { ...stop, reached: !currentStatus } : stop
        )
      );
    } catch (error) {
      console.error("Error updating stop status:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-max w-full">
      <h1 className="text-center text-2xl font-extrabold ">Bus {busNumber}</h1>

      <div className="relative w-full max-w-lg mt-12">
        {stops.length > 0 && (
          <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-2 bg-blue-400 rounded-md"></div>
        )}

        <ul className="space-y-12">
          {stops.length > 0 ? (
            stops.map((stop, index) => (
              <div
                className="flex justify-center items-center relative"
                key={index}>
                <input
                  type="checkbox"
                  checked={stop.reached}
                  onChange={() => updateStopStatus(stop._id, stop.reached)}
                  className="toggle-checkbox hidden"
                  id={`checkbox-${stop._id}`}
                  disabled={
                    stop.reached || (index > 0 && !stops[index - 1].reached)
                  }
                />
                <label
                  htmlFor={`checkbox-${stop._id}`}
                  className={`toggle-label block w-14 h-8 rounded-full cursor-pointer relative z-10 transition-colors duration-300 ease-in-out ${
                    stop.reached ? "bg-green-500" : "bg-blue-500"
                  } ${
                    stop.reached || (index > 0 && !stops[index - 1].reached)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}>
                  <span
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                      stop.reached ? "transform translate-x-6" : ""
                    }`}></span>
                </label>

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
  );
};

export default Driver;
