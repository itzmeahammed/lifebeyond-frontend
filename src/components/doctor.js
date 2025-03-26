import React, { useCallback, useState } from "react";
import "../styles/components/doctor.scss";
import DoctorList from "./doctorlist";

const Doctor = () => {
  return (
    <div className='doctor-container d-flex-full d-flex-col'>
      <div className='doctor-inner-container d-flex-full w-100'>
        <DoctorList />
      </div>
    </div>
  );
};

export default Doctor;
