import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import Doctor from "./components/doctor";
import Chat from "./components/chat";
import DoctorList from "./components/doctorList";
import LawyerList from "./components/lawyerList";
import UserList from "./components/userList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/dashboard"} element={<Dashboard />} />

        <Route path={"/admin"} element={<Admin />} />

        <Route path={"/doctor"} element={<Doctor />} />
        <Route path={"/chat"} element={<Chat />} />
        <Route path={"/list"} element={<UserList />} />
        <Route path={"/"} element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
