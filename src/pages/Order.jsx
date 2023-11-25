import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion";
import ModalOrder from "../components/ModalOrder";

const telegramBotToken = process.env.REACT_APP_TOKEN_TELEGRAM;
const chatId = process.env.REACT_APP_CHAT_ID;
const Order = () => {
  const defaultImage = null;
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    noWa: "",
    design: defaultImage,
    patternImage: "",
    materialImage: "",
    playerList: "",
  });

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
    modalType === "Pola"
      ? setFormData({ ...formData, patternImage: imageUrl })
      : setFormData({ ...formData, materialImage: imageUrl });
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataTelegram = new FormData(e.target);
    const image1 = formDataTelegram.get("design");

    console.log(telegramBotToken);
    console.log(chatId);

    const message = `Nama: ${formData.name}\nNomor WA: ${formData.noWa}\nPemain :\n${formData.playerList}`;
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
      await fetch(
        `https://api.telegram.org/bot${telegramBotToken}/sendMediaGroup`,
        {
          method: "POST",
          body: formDataTelegram,
        }
      );
    } catch (error) {
      console.error("Error sending message via Telegram:", error);
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
                  name="name"
                  type="text"
                  className="form-control"
                  value={formData.name}
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
                <label>Nama Pemain - No Punggung - Ukuran</label>
                <textarea
                  name="playerList"
                  className="form-control"
                  rows={7}
                  aria-label="With textarea"
                  placeholder="Contoh :
                  1. Zecko - 10 - XL
                  2. Dst.."
                  required
                  onChange={handleChange}
                ></textarea>
              </div>
              <motion.button
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
                Kirim
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
