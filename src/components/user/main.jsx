import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  const imagePorto = [
    { url: "https://i.imgur.com/ohyGDe2.jpg", detail: "Zecko x Electric" },
    { url: "https://i.imgur.com/ctsTCYK.jpg", detail: "Zecko x TBSM Neple" },
    { url: "https://i.imgur.com/qMTnUEA.jpg", detail: "Zecko x GTS" },
    { url: "https://i.imgur.com/nHSBuzC.jpg", detail: "Zecko x GHOPER FC" },
    { url: "https://i.imgur.com/KwvWh0T.jpg", detail: "Zecko x Best Friend" },
    // "https://i.imgur.com/qMTnUEA.jpg",
    // "https://i.imgur.com/nHSBuzC.jpg",
    // "https://i.imgur.com/KwvWh0T.jpg",
  ];
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <picture>
            <source
              media="(max-width:500px)"
              srcSet="./assets/img/banner-bg-2.png"
            />
            <img
              className="card-img img-fluid"
              src="./assets/img/banner-bg.png"
              alt="Card"
            />
          </picture>
          <div className="card-img-overlay d-flex align-items-center">
            <motion.div
              className="card-caption"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <h1 className="card-title text fw-2 text-dark my-0">
                Selamat Datang Di Halaman
              </h1>
              <h5 className="card-title text fw-bold text-dark my-0 display-1">
                Zecko Sportwear
              </h5>
              <p className="card-text text-dark pt-5 fs-4">
                Kami di Zecko percaya bahwa setiap gerakan memiliki cerita. Itu
                sebabnya kami memusatkan diri pada menciptakan busana olahraga
                kustom yang tidak hanya memenuhi kebutuhan fungsional, tetapi
                juga merangkul keunikan dan semangat dari setiap atlet, tim,
                atau komunitas.
              </p>
              <motion.a
                whileTap={{ rotate: "2.5deg" }}
                whileHover={{
                  scale: 1.2,
                }}
                transition={{ duration: 0.1 }}
                className="btn btn-warning"
                href="/order"
              >
                Pesan Custom Sekarang
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="container my-3 py-3">
        <h1 className="text-center">Mengapa Memilih Zecko?</h1>
        <hr />
        <div className="shadow p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col-lg-4 d-flex justify-content-center">
              <motion.img
                className="rounded"
                src="./assets/img/promo.jpg"
                alt="Card"
                height={250}
                width={250}
                initial={{ scale: 0.5 }}
                whileInView={{
                  boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                  scale: 1,
                }}
                transition={{ delay: 0.1, duration: 1 }}
                viewport={{ once: false, amount: 0.8 }}
              />
            </div>
            <div className="col-lg-8">
              <h4 className="text-center py-4">Kualitas Tanpa Kompromi</h4>
              <p className="lead">
                Di Zecko, kami memahami betapa pentingnya kualitas dalam setiap
                jahitan. Dengan bahan berkualitas tinggi dan perhatian terhadap
                detail, setiap produk yang kami buat dibuat untuk menahan
                tekanan, memberikan kenyamanan optimal, dan tahan lama bahkan
                dalam kondisi olahraga yang paling intens.
              </p>
            </div>
          </div>
          <div className="row my-4">
            <div className="col-lg-4 d-flex justify-content-center order-lg-2">
              <motion.img
                className="rounded"
                src="./assets/img/promo2.jpg"
                alt="Card"
                height={250}
                width={250}
                initial={{ scale: 0.5 }}
                whileInView={{
                  boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
                  scale: 1,
                }}
                transition={{ delay: 0.1, duration: 1 }}
                viewport={{ once: false, amount: 0.8 }}
              />
            </div>
            <div className="col-lg-8 order-lg-1">
              <h4 className="text-center py-4">Desain yang Menginspirasi</h4>
              <p className="lead">
                Setiap desain Zecko lahir dari imajinasi Anda. Tim desain kami
                bekerja secara langsung dengan Anda untuk menciptakan busana
                olahraga yang mencerminkan identitas, misi, dan gaya unik Anda.
                Dari konsep awal hingga produk akhir, kami menempatkan
                kreativitas Anda sebagai prioritas utama.
              </p>
            </div>
          </div>
        </div>

        <h1 className="text-center py-4">Portofolio Kami</h1>
        <div className="row justify-content-center">
          {imagePorto.map((item, index) => {
            return (
              <div className="col-md-3 col-sm-6 mb-3 px-3" key={index}>
                <div className="card h-100">
                  <img
                    className="card-img-top img-fluid"
                    src={item.url}
                    alt=""
                    height={160}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{item.detail}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <a
        href="https://wa.me/6285927532252?&text=Halo%20admin"
        className="float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-whatsapp my-float"></i>
      </a>
    </>
  );
};

export default Home;
