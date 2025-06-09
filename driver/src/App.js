import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Components/Login/Login";
import Driver from "./Components/Driver/Driver";
import { useState } from "react";

function App() {
  const [loged, useloged] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setloged={useloged} />} />
        {loged === true && (
          <Route path="/stops/:busNumber" element={<Driver />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
