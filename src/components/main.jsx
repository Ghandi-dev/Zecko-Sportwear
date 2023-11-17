import React from "react";

const Home = () => {
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
            <div className="card-caption">
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
              <button className="btn btn-warning">Pesan Custom Sekarang</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-3 py-3">
        <h1 className="text-center">Mengapa Memilih Zecko?</h1>
        <hr />
        <div className="shadow p-3 mb-5 bg-white rounded">
          <div className="row">
            <div className="col-lg-4 d-flex justify-content-center">
              <img
                className="rounded"
                src="./assets/img/promo.jpg"
                alt="Card"
                height={250}
                width={250}
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
              <img
                className="rounded"
                src="./assets/img/promo2.jpg"
                alt="Card"
                height={250}
                width={250}
              />
            </div>
            <div className="col-lg-8 order-lg-1">
              <h4 className="text-center py-4">
                Desain Kustom yang Menginspirasi
              </h4>
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

        <h1 className="text-center py-4">Produk Kami</h1>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Mens's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Jewelery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img
                className="card-img-top img-fluid"
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                height={160}
              />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
