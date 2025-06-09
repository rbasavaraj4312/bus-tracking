import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const AdminEdit = ({ userType }) => {
  const { busNumber } = useParams();
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/stops/${busNumber}`
        );
        setStops(response.data.stop || []);
      } catch (error) {
        console.error("Error fetching stops:", error);
        setError("Failed to load stops. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStops();
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

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const updatedStops = [...stops];
    const draggedItem = updatedStops.splice(draggedItemIndex, 1)[0];
    updatedStops.splice(index, 0, draggedItem);

    setDraggedItemIndex(index);
    setStops(updatedStops);
  };

  const handleDragEnd = async () => {
    setDraggedItemIndex(null);

    try {
      await axios.put(`http://localhost:4000/reorderstops/${busNumber}`, {
        stops: stops.map(({ stopname, reached, latitude, longitude }) => ({
          stopname,
          reached,
          latitude,
          longitude,
        })),
      });
    } catch (error) {
      console.error("Error updating stop order:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading stops...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-max w-full">
      <button className="text-white bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium dark:bg-indigo-500 dark:hover:bg-indigo-300 fixed bottom-0 right-0 mr-8 mb-8 rounded-full text-4xl px-5 pb-3.5 py-2">
        <Link to={`/addstop/${busNumber}`}>+</Link>
      </button>
      <h1 className="text-center text-2xl font-extrabold mb-8">
        Bus {busNumber}
      </h1>
      <div className="relative w-full max-w-lg">
        {stops.length > 0 && (
          <div className="absolute left-[50%] transform -translate-x-1/2 h-full w-2 bg-blue-400 rounded-md"></div>
        )}

        <ul className="space-y-12">
          {stops.length > 0 ? (
            stops.map((stop, index) => (
              <div
                className="flex justify-center items-center relative"
                key={stop._id}>
                <input
                  type="checkbox"
                  checked={stop.reached}
                  onChange={() => updateStopStatus(stop._id, stop.reached)}
                  className="toggle-checkbox hidden"
                  id={`checkbox-${stop._id}`}
                  aria-checked={stop.reached}
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
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={() => handleDragOver(index)}
                  onDragEnd={handleDragEnd}
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

export default AdminEdit;
