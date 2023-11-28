import React, { useState } from "react";
import { Footer, Navbar, Product, Sidebar } from "../../components/user";

const Products = () => {
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
      <main
        className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg "
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Navbar handleButtonClick={handleButtonClick} />
        <Product />
        <Footer />
      </main>
    </>
  );
};

export default Products;
