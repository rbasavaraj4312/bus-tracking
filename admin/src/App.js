import "./App.css";
import Login from "./Components/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import AdminEdit from "./Components/AdminEdit/AdminEdit";
import Addbus from "./Components/Addbus/Addbus";
import Addstop from "./Components/Addstop/Addstop";
import Admin from "./Components/Admin/Admin";
import Navbar from "./Components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [loged, setloged] = useState(false);
  return (
    <div>
      <Router>
        <Navbar loged={loged}/>
        <Routes>
          <Route path="/" element={<Login setloged={setloged} />} />
          <Route path="/signup" element={<SignUp setloged={setloged} />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/stops/:busNumber" element={<AdminEdit />} />
          <Route path="/addbus" element={<Addbus />} />
          <Route path="/addstop/:busNumber" element={<Addstop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
