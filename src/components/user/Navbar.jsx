import React from "react";
import { motion } from "framer-motion";

const Navbar = ({ handleButtonClick }) => {
  return (
    <motion.nav
      initial={{ y: -1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl position-sticky"
      id="navbarBlur"
      navbar-scroll="true"
    >
      <div className="container-fluid py-1 ">
        <a href="/" className="brand-logo mx-0">
          <img height={30} src="https://i.imgur.com/MV83gXS.png" alt="logo" />
        </a>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
              {/* eslint-disable-next-line */}
              <a
                href={undefined}
                className="nav-link text-body p-0"
                id="iconNavbarSidenav"
                onClick={handleButtonClick}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
