import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/clientSupabase";
const Sidebar = (isActive) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        navigate("/login", { replace: true }); // Navigasi langsung ke halaman login
      } else {
        console.error("Logout error:", error);
      }
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };
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
                className={
                  pathname === "/dashboard" ? "nav-link active" : "nav-link"
                }
                href="/dashboard"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i
                    className="fa-solid fa-chart-simple"
                    style={
                      pathname === "/dashboard"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  ></i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={
                  pathname === "/admin/product" ? "nav-link active" : "nav-link"
                }
                href="/admin/product"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i
                    className="fa-solid fa-shirt"
                    style={
                      pathname === "/admin/product"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  ></i>
                </div>
                <span className="nav-link-text ms-1">Product</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={
                  pathname === "/admin/bahan" ? "nav-link active" : "nav-link"
                }
                href="/admin/bahan"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i
                    className="fa-solid fa-scroll"
                    style={
                      pathname === "/admin/bahan"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  ></i>
                </div>
                <span className="nav-link-text ms-1">Jenis Bahan</span>
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className={
                  pathname === "/admin/pola" ? "nav-link active" : "nav-link"
                }
                href="/admin/pola"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i
                    className="fa-solid fa-scissors"
                    style={
                      pathname === "/admin/pola"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  ></i>
                </div>
                <span className="nav-link-text ms-1">Pola Jahitan</span>
              </a>
            </li>
          </ul>
          <hr className="horizontal dark mt-5" />
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* eslint-disable-next-line */}
              <a className="nav-link active2">
                <div
                  onClick={handleLogout}
                  className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <span className="nav-link-text ms-1">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
