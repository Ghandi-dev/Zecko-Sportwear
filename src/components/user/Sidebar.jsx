/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router-dom";

const Sidebar = (isActive) => {
  const { pathname } = useLocation();
  return (
    <>
      <aside
        className={
          isActive
            ? "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-white"
            : "sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
        }
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
          />
          <a className="navbar-brand m-0" href="/" rel="noreferrer">
            <img
              src="https://i.imgur.com/MV83gXS.png"
              width={100}
              className="navbar-brand-img h-100"
              alt="main_logo"
            />
          </a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse  w-auto  max-height-vh-100 h-100"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={pathname === "/" ? "nav-link active" : "nav-link"}
                href="/"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-house"></i>
                </div>
                <span className="nav-link-text ms-1">Home</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={
                  pathname === "/product" ? "nav-link active" : "nav-link"
                }
                href="/product"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-shirt"></i>
                </div>
                <span className="nav-link-text ms-1">Product</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={
                  pathname === "/about" ? "nav-link active" : "nav-link"
                }
                href="/about"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-copyright"></i>
                </div>
                <span className="nav-link-text ms-1">About</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
