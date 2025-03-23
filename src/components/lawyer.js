import React from "react";
import "../styles/components/lawyer.scss";
import LawyerList from "./lawyerslist";

const Lawyer = () => {
  return (
    <div className='lawyer-container d-flex-full d-flex-col'>
      {/* <div className='lawyer-inner-container d-flex-col gap-16 d-flex-jsc'> */}
      <LawyerList />
      {/* </div> */}
    </div>
  );
};

export default Lawyer;
