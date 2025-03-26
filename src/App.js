import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import Doctor from "./components/doctor";
import { useEffect, useState } from "react";
import LoginPage from "./components/login";
import DoctorDashbaord from "./components/doctorDashbaord";
import LawyerDashboard from "./components/lawyerDashboard";

function App() {
  const location = useLocation();

  const [currentPage, setcurrentPage] = useState("dashboard");

  useEffect(() => {
    setcurrentPage("dashboard");
  }, [location.pathname === "/login", location.pathname === "/"]);

  return (
    <>
      {location.pathname === "/login" || location.pathname === "/" ? (
        <></>
      ) : (
        <Navbar setcurrentPage={setcurrentPage} currentPage={currentPage} />
      )}

      <Routes>
        <Route
          path={"/dashboard"}
          element={
            <Dashboard
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
            />
          }
        />
        <Route path={"/"} element={<LoginPage />} />
        <Route path={"/login"} element={<LoginPage />} />

        <Route path={"/admin"} element={<Admin currentPage={currentPage} />} />

        <Route
          path={"/doctor"}
          element={<DoctorDashbaord currentPage={currentPage} />}
        />

        <Route
          path={"/lawyer"}
          element={<LawyerDashboard currentPage={currentPage} />}
        />

        {/* <Route path={"/"} element={<Dashboard />} /> */}
      </Routes>
    </>
  );
}

export default App;
