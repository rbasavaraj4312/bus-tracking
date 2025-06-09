import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Buses = () => {
  const [Buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bus");
        setBuses(response.data || []);
      } catch (error) {
        console.error("Error fetching buses:", error);
        setError("Failed to load buses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  const navigate = useNavigate(); // Use navigate to programmatically change routes

  const handleBusClick = (busNumber) => {
    navigate(`/stops/${busNumber}`);
  };

  if (loading) {
    return <p className="text-center">Loading buses...</p>;
  }

  return (
    <div className="container lg:w-[40%] mx-auto p-4">
      {/* <div className="w-full max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="from" className="block text-gray-700 font-medium">
            FROM
          </label>
          <input
            type="text"
            name="from"
            id="from"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter starting point"
          />
        </div>
        <div>
          <label htmlFor="to" className="block text-gray-700 font-medium">
            TO
          </label>
          <input
            type="text"
            name="to"
            id="to"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter destination"
          />
        </div>
      </div> */}
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : Buses.length > 0 ? (
        <div className="space-y-4">
          {[...Buses]
            .sort((a, b) => a.number.localeCompare(b.number))
            .map((Bus, index) => (
              <div
                className="flex flex-col p-4 rounded-lg shadow-md border-l-4 border-indigo-500 bg-indigo-50 hover:scale-110 duration-700"
                key={index}
                onClick={() => handleBusClick(Bus.number)}>
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-600 text-white font-bold text-xl rounded-full w-12 h-12 flex justify-center items-center">
                      {Bus.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{`Bus ${Bus.number}`}</h3>
                      <p className="text-gray-500">
                        From:{" "}
                        {Bus.stop.length > 0 ? Bus.stop[0].stopname : "N/A"}
                      </p>
                      <p className="text-gray-500">
                        To:{" "}
                        {Bus.stop.length > 0
                          ? Bus.stop[Bus.stop.length - 1].stopname
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-700">
                    {`Next Stop: ${
                      Bus.stop.length === 0
                        ? "N/A"
                        : Bus.stop.find((stop) => !stop.reached)?.stopname ||
                          "Finished"
                    }`}
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className="text-black dark:text-gray-100 text-xl xl:text-4xl text-center mt-36 font-bold">
          No Buses added
        </p>
      )}
    </div>
  );
};

export default Buses;
