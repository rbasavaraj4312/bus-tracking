import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./Components/User/User";
import Buses from "./Components/Buses/Buses";

function App() {
  // const [userType, setUserType] = useState();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Buses />} />
          <Route path="/stops/:busNumber" element={<User />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
