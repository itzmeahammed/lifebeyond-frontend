import React from "react";
import "../styles/components/dashboard.scss";
import voiceGif from "../assets/gif/voice-assistant.gif";

const Dashboard = () => {
  return (
    <div className='dashboard-container d-flex-full d-flex-col'>
      <div className='dashboard-inner-container  d-flex-col gap-16 d-flex-jsc'>
        <p>Your past does not define you—your future is yours to build.</p>
        <div className='dasboard-btn-container '>
          <button className='p-16 cursor-ptr'>Education</button>
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
  );
};

export default Dashboard;
