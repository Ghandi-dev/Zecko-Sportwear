import React from "react";
import { Navbar, Footer, Sidebar } from "../../components/admin";
import { useState } from "react";

const Dashboard = () => {
  const [asideIsActive, setAsideIsActive] = useState(false);

  const handleButtonClick = () => {
    // Menambah kelas pada elemen <body>
    !document.body.classList.contains("g-sidenav-pinned")
      ? document.body.classList.add("g-sidenav-pinned")
      : document.body.classList.remove("g-sidenav-pinned");
    // Menambah kelas pada elemen <aside>
    if (asideIsActive) {
      setAsideIsActive(false);
    }
  };
  return (
    <>
      <Sidebar isActive={asideIsActive} />
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar handleButtonClick={handleButtonClick} title={"DASHBOARD"} />
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
