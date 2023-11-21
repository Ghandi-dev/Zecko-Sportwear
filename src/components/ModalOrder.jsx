// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal, Button } from "react-bootstrap";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./modal.css";

// import required modules
import { Pagination, EffectCards } from "swiper/modules";
import React from "react";

const ModalOrder = ({ show, handleClose, handleImageSelection, modalType }) => {
  const images = [
    "https://i.imgur.com/SaIC9la.jpg",
    "https://i.imgur.com/pv2SBFA.jpg",
    // Tambahkan URL gambar lainnya
  ];

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType == "Pola" ? "Pilih Pola" : "Pilih  Material"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            geser ke kiri untuk {modalType == "Pola" ? "pola" : "material"}{" "}
            lainnya
          </p>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            pagination={true}
            className="mySwiper"
          >
            {images.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <img
                  src={imageUrl}
                  alt={`Gambar ${index + 1}`}
                  //   style={{ width: "100%", height: "auto" }}
                  onClick={() => handleImageSelection(imageUrl, modalType)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalOrder;
