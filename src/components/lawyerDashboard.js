import React from "react";
import Doctor from "./doctor";
import SuccessStory from "./successStory";
import Lawyer from "./lawyer";
import { useLocation } from "react-router-dom";
import Chat from "./chat";

const LawyerDashboard = ({ currentPage }) => {
  const path = useLocation();
  return currentPage == "dashboard" ? (
    <div className='dashboard-container d-flex-full d-flex-col'>
      <div className='dashboard-inner-container  d-flex-col gap-16 d-flex-jsc'>
        <p>Your past does not define you—your future is yours to build.</p>
        <div className='dasboard-btn-container '>
          <button className='p-16 cursor-ptr'>Get Started</button>
        </div>
        <div className='voice-assistent-gif-container d-flex-col d-flex-full cursor-ptr'>
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
  ) : (
    currentPage == "chat" && <Chat />
  );
};

export default LawyerDashboard;
