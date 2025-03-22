import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/navbar.scss";

const Navbar = () => {
  return (
    <>
      <div className='navbar-container d-flex-jsb p-16'>
        <div className='navbar-logo-container d-flex-alc'>
          <span>Life Beyond</span>
        </div>
        <div className='navbar-body-container d-flex-alc gap-16'>
          <Link to='/dashboard'>Home</Link>
          <Link to='/doctor'>Doctor</Link>
          <Link to='/lawyer'>Lawyer</Link>
          <Link to='/succes-stoires'>Success Stories</Link>
        </div>
        <div className='navbar-footer-container d-flex-alc gap-16'>
          <Link to='/login'>Log in</Link>
          <button className='p-8 cursor-ptr'>Get Started</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
