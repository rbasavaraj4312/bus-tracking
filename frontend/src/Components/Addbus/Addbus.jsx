import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addbus = () => {
  const [number, setnumber] = useState(""); // Bus number state
  const navigate = useNavigate(); // For navigation

  // Handle input change for the bus number
  const handleChange = (e) => {
    setnumber(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to add the bus
      await axios.post("http://localhost:4000/addbus", { number });
      alert(`${number} Bus added successfully!`); // Success message
      setnumber(""); // Clear input field after successful submission
      navigate("/buses"); // Navigate to a different page
    } catch (error) {
      if (error.status === 400) {
        console.error("Bus number alredy exists :", error);
        alert("Bus number already exists , try unique number");
      } else {
        console.error("There was an error adding the bus:", error);
        alert("Failed to add bus. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add Bus +
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="number"
              value={number}
              id="floating_number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              min={0}
              onChange={handleChange} // Handle input change
            />
            <label
              htmlFor="number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-50 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Bus number
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add +
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbus;
