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
          <h1 className="text-center">About Us</h1>
          <hr />
          <p className="lead text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            facere doloremque veritatis odit similique sequi. Odit amet fuga nam
            quam quasi facilis sed doloremque saepe sint perspiciatis explicabo
            totam vero quas provident ipsam, veritatis nostrum velit quos
            recusandae est mollitia esse fugit dolore laudantium. Ex vel
            explicabo earum unde eligendi autem praesentium, doloremque
            distinctio nesciunt porro tempore quis eaque labore voluptatibus ea
            necessitatibus exercitationem tempora molestias. Ad consequuntur
            veniam sequi ullam tempore vel tenetur soluta dolore sunt maxime
            aliquam corporis est, quo saepe dolorem optio minus sint nemo totam
            dolorum! Reprehenderit delectus expedita a alias nam recusandae illo
            debitis repellat libero, quasi explicabo molestiae saepe, dolorem
            tempore itaque eveniet quam dignissimos blanditiis excepturi harum
            numquam vel nihil? Ipsum
          </p>

          <h2 className="text-center py-4">Our Products</h2>
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
        <Footer />
      </main>
    </>
  );
};

export default AboutPage;
