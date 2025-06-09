import React from "react";
import logo from "/Users/basavaraj/Desktop/Bus/admin/src/Components/Navbar/icons8-bus.gif";
import { NavLink } from "react-router-dom";

const Navbar = ({ loged }) => {
  return (
    <div className="bg-indigo-600 p-4">
      <div className="flex items-center justify-center">
        {loged === true && (
          <NavLink to="/admin" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12" // Adjust logo size
            />
            <h1 className="text-white text-2xl font-bold mt-2">BUS TRACKER</h1>
          </NavLink>
        )}
        {loged === false && (
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="logo"
              className="w-12 h-12" // Adjust logo size
            />
            <h1 className="text-white text-2xl font-bold mt-2">BUS TRACKER</h1>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
