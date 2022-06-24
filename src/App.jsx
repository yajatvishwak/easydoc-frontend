import { Route, Routes } from "react-router-dom";
import Home from "./lib/Home";
import "react-modern-drawer/dist/index.css";
import Patient from "./lib/Patient";
import PatientHome from "./lib/PatientHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/phome" element={<PatientHome />} />
      <Route path="/patient/:uid" element={<Patient />} />
    </Routes>
  );
}

export default App;
