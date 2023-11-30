import React, { useState } from "react";
import { Footer, Navbar, Sidebar } from "../../components/user";
const AboutPage = () => {
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
        <div className="container my-3 py-3">
          <h1 className="text-center">Tentang Kami</h1>
          <hr />
          <p className=" text-center">
            "Zecko Sportwear merupakan layanan pembuatan jersey olahraga custom
            baik untuk kebutuhan komunitas, tim, atau untuk event tertentu dalam
            jumlah banyak. Zecko Sportwear selalu mengutamakan layanan dan
            kualitas terbaik dari setiap produk yang kami buat, dengan
            menerapkan quality control yang ketat disetiap tahapannya.
            <br />
            <br />
            Alhamdulillaah sampai saat ini Zecko Sportwear telah dipercaya 100+
            pelanggan yang setia menggunakan layanan kami dan telah memproduksi
            2,000+ pcs setiap bulannya. jersey berkualitas. Kami percaya dengan
            mengutamakan kualitas bahan yang terbaik, desain 2D/3D dan ketajaman
            warna, serta pelayanan responsif dan cepat, kami dapat memberikan
            pelayanan terbaik seperti yang kamu harapkan. Bikin Jersey Custom?
            Di kami tempatnya! Anda puas. Kami Bangga!"
          </p>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
