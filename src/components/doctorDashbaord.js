import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Chat from "./chat";
import Cookies from "js-cookie";
import VoiceRecorder from "./voiceAssistant";

const DoctorDashbaord = ({ currentPage }) => {
  const navigate = useNavigate();
  const [isrecordStart, setisrecordStart] = useState(false);

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  useEffect(() => {
    if (!token) navigate("/");

    if (role === "user") navigate("/dashboard");
    if (role === "admin") navigate("/admin");

    if (role === "lawyer") navigate("/lawyer");
  }, [role, token]);

  return currentPage == "dashboard" ? (
    <>
      <div className='dashboard-container d-flex-full d-flex-col'>
        <div className='dashboard-inner-container  d-flex-col gap-16 d-flex-jsc'>
          <p>Your past does not define you—your future is yours to build.</p>
          <div className='dasboard-btn-container '>
            <button className='p-16 cursor-ptr'>Get Started</button>
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
  ) : (
    currentPage == "chat" && <Chat />
  );
};

export default DoctorDashbaord;
