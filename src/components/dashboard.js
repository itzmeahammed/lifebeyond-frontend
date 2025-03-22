import React from "react";
import "../styles/components/dashboard.scss";

const Dashboard = () => {
  return (
    <div className='dashboard-container d-flex-full d-flex-col'>
      <div className='dashboard-inner-container d-flex-col gap-16'>
        <p>Your past does not define you—your future is yours to build.</p>
        <div className='dasboard-btn-container '>
          <button className='p-16 cursor-ptr'>Education</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
