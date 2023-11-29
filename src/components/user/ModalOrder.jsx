import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal, Button } from "react-bootstrap";
import supabase from "../../config/clientSupabase";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./modal.css";

import { Pagination, EffectCards } from "swiper/modules";

const ModalOrder = ({ show, handleClose, handleImageSelection, modalType }) => {
  const CDN_URL = process.env.REACT_APP_CDN_URL;
  const [pola, setPola] = useState();
  const [bahan, setbahan] = useState({ nama: "", image_url: "" });
  let images = [];

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBahan = async () => {
      const { data, error } = await supabase.from("bahan").select("*");
      if (!error) {
        setbahan(data);
      } else {
        console.log("error");
      }
    };
    const getPola = async () => {
      const { data, error } = await supabase.from("pola").select("*");
      if (!error) {
        setPola(data);
      } else {
        console.log("error");
      }
    };
    getPola();
    getBahan();
  }, []);
  if (modalType === "Pola") {
    images = pola;
  } else if (modalType === "Bahan") {
    images = bahan;
  } else {
    images = ["https://i.imgur.com/z2Duai6.jpg"];
  }
  // console.log(images);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType !== "Info" ? `Pilih ${modalType}` : "Info Ukuran"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {modalType !== "Info"
              ? `geser ke kiri untuk ${modalType} lainnya`
              : ""}
          </p>
          <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            pagination={true}
            className="mySwiper"
          >
            {images.map((data, index) => (
              <SwiperSlide key={index}>
                <p>{data.nama}</p>
                <img
                  src={modalType !== "Info" ? CDN_URL + data.image_url : data}
                  alt={`Gambar ${index + 1}`}
                  //   style={{ width: "100%", height: "auto" }}
                  onClick={() => handleImageSelection(data, modalType)}
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
