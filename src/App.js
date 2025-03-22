import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/dashboard"} element={<Dashboard />} />

        <Route path={"/"} element={<Dashboard />} />

        <Route path={"/"} element={<Dashboard />} />

        <Route path={"/"} element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
