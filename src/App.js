import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import Doctor from "./components/doctor";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/dashboard"} element={<Dashboard />} />

        <Route path={"/admin"} element={<Admin />} />

        <Route path={"/doctor"} element={<Doctor />} />

        <Route path={"/"} element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
