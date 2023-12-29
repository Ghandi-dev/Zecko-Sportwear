import React from "react";

const Navbar = ({ handleButtonClick, title }) => {
  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
        id="navbarBlur"
        navbar-scroll="true"
      >
        <div className="container-fluid py-1 px-3">
          <nav aria-label="breadcrumb">
            <h2 className="font-weight-bolder mb-0">{title}</h2>
          </nav>
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
            id="navbar"
          >
            <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
            <ul className="navbar-nav  justify-content-end">
              <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                {/*  eslint-disable-next-line */}
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
      </nav>
      {/* End Navbar */}
    </>
  );
};

export default Navbar;
