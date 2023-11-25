import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion";
import ModalOrder from "../components/ModalOrder";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";

const telegramBotToken = process.env.REACT_APP_TOKEN_TELEGRAM;
const chatId = process.env.REACT_APP_CHAT_ID;
const Order = () => {
  const defaultImage = null;
  const defaultFormData = {
    nama: "",
    noWa: "",
    design: defaultImage,
    patternImage: "",
    materialImage: "",
    playerList: "",
  };
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "design") {
      const file = e.target.files[0];
      setFormData({ ...formData, design: file ? file : defaultImage });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageSelection = (imageUrl, modalType) => {
    if (modalType === "Pola" || modalType === "Material") {
      modalType === "Pola"
        ? setFormData({ ...formData, patternImage: imageUrl })
        : setFormData({ ...formData, materialImage: imageUrl });
    }
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataTelegram = new FormData(e.target);
    const image1 = formDataTelegram.get("design");

    const message = `Nama: ${formData.nama}\nNomor WA: ${formData.noWa}\nPemain :\n${formData.playerList}`;
    const mediaArray = [
      {
        type: "photo",
        media: `attach://${image1.name}`,
        caption: message,
      },
      {
        type: "photo",
        media: `${formData.materialImage}`,
      },
      {
        type: "photo",
        media: `${formData.patternImage}`,
      },
    ];
    formDataTelegram.set("chat_id", chatId);
    formDataTelegram.set("caption", message); // Menggunakan 'caption' untuk teks
    formDataTelegram.set("media", JSON.stringify(mediaArray));
    formDataTelegram.set(image1.name, image1);
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMediaGroup`,
        {
          method: "POST",
          body: formDataTelegram,
        }
      );
      if (response.ok === true) {
        Swal.fire({
          icon: "success",
          title: "Pemesanan anda telah berhasil",
          text: "Admin kami segera menghubungi anda",
          confirmButtonText: "OK",
        });
        setFormData(defaultFormData);
        setIsLoading(false);
        e.target.reset();
      }
    } catch (error) {
      console.error("Error sending message via Telegram:", error);
      Swal.fire({
        icon: "error",
        title: "Terjadi Masalah",
        text: "Pesanan anda tidak dapat diproses",
        footer:
          '<a href="https://wa.me/6285927532252?&text=Halo%2C%20Website%20anda%20bermasalah%20bisakah%20anda%20membantu%20saya%20%3F">Chat admin kami</a>',
      });
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row text-center my-3">
          <h1> Form Order</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 shadow p-3 mb-5 bg-white rounded ">
            <form className="lead" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama</label>
                <input
                  name="nama"
                  type="text"
                  className="form-control"
                  value={formData.nama}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Nomor WhatsApp</label>
                <input
                  name="noWa"
                  type="text"
                  className="form-control"
                  required
                  value={formData.noWa}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Desain</label>
                <div className="input-group mb-3 custom">
                  <input
                    type="file"
                    name="design"
                    accept="image/*"
                    className="form-control"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Pola</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondary lead"
                      type="button"
                      onClick={() => {
                        setShowModal(true);
                        setModalType("Pola");
                      }}
                    >
                      Pilih
                    </button>
                  </div>
                  <input
                    type="text"
                    name="pola"
                    className="form-control"
                    value={formData.patternImage}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Jenis Bahan</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-secondary lead"
                      type="button"
                      onClick={() => {
                        setShowModal(true);
                        setModalType("Material");
                      }}
                    >
                      Pilih
                    </button>
                  </div>
                  <input
                    type="text"
                    name="material"
                    className="form-control"
                    value={formData.materialImage}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-8">
                    <label>Daftar Pemain</label>
                  </div>
                  <div className="col-4 text-right">
                    <label>info ukuran&ensp;</label>
                    <i
                      className="fa-solid fa-circle-info"
                      onClick={() => {
                        setShowModal(true);
                        setModalType("Info");
                      }}
                    ></i>
                  </div>
                </div>
                <textarea
                  name="playerList"
                  className="form-control lead"
                  rows={7}
                  aria-label="With textarea"
                  placeholder="Nama - No Punggung - Ukuran&#10;-&#10;Contoh :&#10;1. Zecko - 10 - XL&#10;2. Dst..&#10;-&#10;Informasi ukuran bisa klik tanda seru di pojok kanan"
                  required
                  value={formData.playerList}
                  onChange={handleChange}
                ></textarea>
              </div>
              <motion.button
                style={{ width: "10vh" }}
                whileTap={{ rotate: "2.5deg" }}
                whileHover={{
                  scale: 1.2,
                }}
                transition={{ duration: 0.1 }}
                type="submit"
                className="btn btn-warning float-right"
                disabled={
                  formData.materialImage === null ||
                  formData.patternImage === null
                }
              >
                {isLoading ? <Spinner animation="border" size="sm" /> : "Kirim"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
      <ModalOrder
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleImageSelection={handleImageSelection}
        modalType={modalType}
      />
      <Footer />
    </>
  );
};

export default Order;
