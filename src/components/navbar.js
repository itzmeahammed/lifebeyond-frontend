import React from "react";
import { span, useLocation, useNavigate } from "react-router-dom";
import "../styles/components/navbar.scss";
import Cookies from "js-cookie";

const Navbar = ({ setcurrentPage, currentPage }) => {
  const path = useLocation();
  const navigate = useNavigate();

  const handlePage = (value) => {
    setcurrentPage(value);
  };
  const handleSignOut = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    navigate("/");
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
          {(path?.pathname?.includes("/dashboard") ||
            path?.pathname?.includes("/admin")) && (
            <>
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
            </>
          )}
          {(path?.pathname?.includes("/doctor") ||
            path?.pathname?.includes("/lawyer")) && (
            <span
              to='/chat'
              onClick={() => handlePage("chat")}
              className={`cursor-ptr ${
                currentPage == "chat" && "current-page-indication"
              }`}
            >
              Chat
            </span>
          )}
          {path?.pathname?.includes("/admin") && (
            <span
              to='/users'
              onClick={() => handlePage("users")}
              className={`cursor-ptr ${
                currentPage == "users" && "current-page-indication"
              }`}
            >
              Users
            </span>
          )}
          {path?.pathname?.includes("/dashboard") && (
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
          <button className='p-16  cursor-ptr' onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
