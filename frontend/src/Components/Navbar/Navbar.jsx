import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setUserType }) => {
  const navigate = useNavigate();

  const driver = () => {
    setUserType("driver");
    navigate("/driverview");
  };
  const admin = () => {
    setUserType("admin");
    navigate("/adminedit");
  };
  const user = () => {
    setUserType("user");
    navigate("/userview");
  };
  return (
    <div className="flex bg-gray-100">
      <button
        className="w-[50%] h-12 text-2xl bg-slate-200 font-semibold my-4 mx-7 border-[1.5px] rounded-md border-slate-700"
        onClick={admin}>
        Admin
      </button>
      <button
        className="w-[50%] h-12 text-2xl bg-slate-200 font-semibold my-4 mx-7 border-[1.5px] rounded-md border-slate-700"
        onClick={driver}>
        Driver
      </button>
      <button
        className="w-[50%] h-12 text-2xl bg-slate-200 font-semibold my-4 mx-7 border-[1.5px] rounded-md border-slate-700"
        onClick={user}>
        User
      </button>
    </div>
  );
};

export default Navbar;
