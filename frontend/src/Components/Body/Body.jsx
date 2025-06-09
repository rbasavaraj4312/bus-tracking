import React from "react";
import { Link } from "react-router-dom";
import Driver from "../Driver/Driver";
import User from "../User/User";

const Body = ({ userType }) => {
  return (
    <div className="mt-8 h-max">
      {userType === "driver" && (
        <>
          <button className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium dark:bg-slate-600 dark:hover:bg-slate-700 fixed bottom-20 right-0 mr-8 mb-8 rounded-full text-4xl px-5 pb-3.5 py-2">
            <Link to="/addbus">B</Link>
          </button>
          <button className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium dark:bg-slate-600 dark:hover:bg-slate-700 fixed bottom-0 right-0 mr-8 mb-8 rounded-full text-4xl px-5 pb-3.5 py-2">
            <Link to="/addstop">S</Link>
          </button>
          <Driver />
        </>
      )}
      {userType === "user" && (
        <>
          <User />
        </>
      )}
    </div>
  );
};

export default Body;
