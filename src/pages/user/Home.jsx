import { Navbar, Main, Footer, Sidebar } from "../../components/user";
import { useState } from "react";

function Home() {
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
        <Navbar handleButtonClick={handleButtonClick} />
        <Main />
        <Footer />
      </main>
    </>
  );
}

export default Home;
