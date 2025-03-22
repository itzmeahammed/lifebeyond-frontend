import React from "react";
import { span, useLocation } from "react-router-dom";
import "../styles/components/navbar.scss";

const Navbar = ({ setcurrentPage, currentPage }) => {
  const path = useLocation();

  const handlePage = (value) => {
    setcurrentPage(value);
  };
  return (
    <>
      <div className='navbar-container d-flex-jsb p-16'>
        <div className='navbar-logo-container d-flex-alc'>
          <span>Life Beyond</span>
        </div>
        <div className='navbar-body-container d-flex-alc gap-16'>
          <span
            to='/dashboard'
            onClick={() => handlePage("dashboard")}
            className={`cursor-ptr ${
              currentPage == "dashboard" && "current-page-indication"
            }`}
          >
            Home
          </span>
          <span
            to='/doctor'
            onClick={() => handlePage("doctor")}
            className={`cursor-ptr ${
              currentPage == "doctor" && "current-page-indication"
            }`}
          >
            Doctor
          </span>
          <span
            to='/lawyer'
            onClick={() => handlePage("lawyer")}
            className={`cursor-ptr ${
              currentPage == "lawyer" && "current-page-indication"
            }`}
          >
            Lawyer
          </span>
          {path?.pathname?.includes("/admin") ? (
            <span
              to='/users'
              onClick={() => handlePage("users")}
              className={`cursor-ptr ${
                currentPage == "users" && "current-page-indication"
              }`}
            >
              Users
            </span>
          ) : (
            <span
              to='/succes-stoires'
              onClick={() => handlePage("success-story")}
              className={`cursor-ptr ${
                currentPage == "success-story" && "current-page-indication"
              }`}
            >
              Success Stories
            </span>
          )}
        </div>
        <div className='navbar-footer-container d-flex-alc gap-16'>
          <span to='/login'>Log in</span>
          <button className='p-16  cursor-ptr'>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
