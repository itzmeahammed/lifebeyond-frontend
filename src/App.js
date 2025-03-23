import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import Doctor from "./components/doctor";
import { useState } from "react";
import LoginPage from "./components/login";

function App() {
  const location = useLocation();

  const [currentPage, setcurrentPage] = useState("dashboard");
  return (
    <>
      {location.pathname == "/login" && location.pathname == "/" ? (
        ""
      ) : (
        <Navbar setcurrentPage={setcurrentPage} currentPage={currentPage} />
      )}

      <Routes>
        <Route
          path={"/dashboard"}
          element={<Dashboard currentPage={currentPage} />}
        />
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/login"} element={<LoginPage />} />

        <Route path={"/admin"} element={<Admin />} />

        {/* <Route path={"/doctor"} element={<Doctor />} /> */}

        {/* <Route path={"/"} element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
