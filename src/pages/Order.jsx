import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { motion } from "framer-motion";
import ModalOrder from "../components/ModalOrder";

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [patternImage, setPatternImage] = useState(null);
  const [materialImage, setMaterialImage] = useState(null);

  const handleImageSelection = (imageUrl, modalType) => {
    modalType == "Pola"
      ? setPatternImage(imageUrl)
      : setMaterialImage(imageUrl);
    setShowModal(false);
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
            <form className="lead">
              <div class="form-group">
                <label for="nama">Nama</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="noWa">Nomor WhatsApp</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label for="Pola">Pola</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-secondary lead"
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
                    class="form-control"
                    value={patternImage}
                    disabled
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="Pola">Material</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-secondary lead"
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
                    class="form-control"
                    value={materialImage}
                    disabled
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="jumlah">Jumlah</label>
                <input type="text" class="form-control" />
              </div>
              <motion.button
                whileTap={{ rotate: "2.5deg" }}
                whileHover={{
                  scale: 1.2,
                }}
                transition={{ duration: 0.1 }}
                type="submit"
                class="btn btn-warning float-right"
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
