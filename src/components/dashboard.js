import React, { useEffect, useState } from "react";
import "../styles/components/dashboard.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Doctor from "./doctor";
import SuccessStory from "./successStory";
import Lawyer from "./lawyer";
import Cookies from "js-cookie";
import VoiceRecorder from "./voiceAssistant";

const Dashboard = ({ currentPage, setcurrentPage }) => {
  const [isDoctorContactClicked, setisDoctorContactClicked] = useState(false);
  const path = useLocation();
  const navigate = useNavigate();
  const [isrecordStart, setisrecordStart] = useState(false);

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  useEffect(() => {
    if (!token) navigate("/");

    if (role === "doctor") navigate("/doctor");
    if (role === "admin") navigate("/admin");

    if (role === "lawyer") navigate("/lawyer");
  }, [role, token]);

  return currentPage == "dashboard" ? (
    <>
      <div className='dashboard-container d-flex-full d-flex-col'>
        <div className='dashboard-inner-container  d-flex-col gap-16 d-flex-jsc'>
          <p>Your past does not define you—your future is yours to build.</p>
          <div className='dasboard-btn-container '>
            <button
              className='p-16 cursor-ptr'
              onClick={() => setcurrentPage("success-story")}
            >
              Get Started
            </button>
          </div>
          <div
            className='voice-assistent-gif-container d-flex-col d-flex-full cursor-ptr'
            onClick={() => setisrecordStart(true)}
          >
            <img
              src={
                "https://mir-s3-cdn-cf.behance.net/project_modules/hd/f4020f114494633.603cbcc781296.gif"
              }
              style={{
                borderRadius: "100px",
                objectFit: "cover",
              }}
              alt=''
              width={70}
              height={70}
            />
            <span className='cursor-ptr'>Ask me </span>
          </div>
        </div>
      </div>
      <VoiceRecorder
        isrecordStart={isrecordStart}
        setisrecordStart={setisrecordStart}
      />
    </>
  ) : currentPage == "doctor" ? (
    <Doctor />
  ) : currentPage == "success-story" ? (
    <SuccessStory />
  ) : (
    currentPage == "lawyer" && <Lawyer />
  );
};

export default Dashboard;
