// Import Swiper React components
import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import supabase from "../../config/clientSupabase";
import Swal from "sweetalert2";
import uuid from "react-uuid";
import { customLog } from "../../utils/CustomLogger";

import "./modal.css";
const CDN_URL = process.env.REACT_APP_CDN_URL;

export const ModalDetail = ({ show, handleClose, modalType, id, getPola }) => {
  const [pola, setPola] = useState({
    nama: "",
  });
  const [polaImage, setPolaImage] = useState(null);
  const [dataPola, setDataPola] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPolaImage(file);
  };

  //   update data pola
  const handleUpdatePola = async () => {
    let imageUploadData = {};
    if (polaImage !== null) {
      const { data: imageUpload, error: imageUploadError } =
        await supabase.storage
          .from("images")
          .upload(`pola/` + uuid(), polaImage);
      imageUploadData = imageUpload;

      if (imageUploadError) {
        console.error("Error uploading image:", imageUploadError.message);
        return;
      } else {
        // eslint-disable-next-line
        const { data: deletImageData, error: deletImageError } =
          await supabase.storage.from("images").remove([pola.image_url]);
        deletImageError
          ? customLog("Error delete image")
          : customLog("Image berhasil dihapus");
      }
    }
    const { error } = await supabase
      .from("pola")
      .update({
        nama: pola.nama,
        image_url: polaImage === null ? pola.image_url : imageUploadData.path,
      })
      .eq("id", id);

    if (error) {
      console.error("Error edit pola:", error.message);
    } else {
      getPola();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        confirmButtonText: "OK",
      });
    }
  };

  //   mengambil data pola by id
  const getPolaByid = async () => {
    const { data, error } = await supabase.from("pola").select().eq("id", id);
    if (!error) {
      setDataPola(data[0]);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (show) {
      getPolaByid();
    }
    // eslint-disable-next-line
  }, [show]);

  useEffect(() => {
    if (dataPola.nama !== undefined) {
      setPola({
        ...pola,
        nama: dataPola.nama,
        image_url: dataPola.image_url,
      });
    }
    // eslint-disable-next-line
  }, [dataPola]);

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-align-center">
          {modalType === "detail" ? (
            <>
              <img
                src={
                  pola.image_url !== undefined ? CDN_URL + pola.image_url : ""
                }
                className="rounded"
                alt={`Gambar ${id}`}
                width={250}
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              <div
                className="card mt-2"
                style={{
                  width: "18rem",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Nama : {pola.nama}</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <form>
                <div className="mb-3">
                  <label className="form-label">Nama Pola:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={pola.nama}
                    onChange={(e) => setPola({ ...pola, nama: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Pola Image:</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <button
                  type="button"
                  className="btn bg-gradient-info"
                  style={{ float: "right" }}
                  onClick={handleUpdatePola}
                >
                  Edit
                </button>
              </form>
            </>
          )}
        </Modal.Body>
        {modalType === "detail" ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Tutup
            </Button>
          </Modal.Footer>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export const ModalTambah = ({ show, handleClose, modalType, getPola }) => {
  const [pola, setPola] = useState({
    nama: "",
  });
  const [polaImage, setPolaImage] = useState(null);
  const [isloading, setLoading] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPolaImage(file);
  };

  const handleAddPola = async () => {
    setLoading(true);
    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage.from("images").upload(`pola/` + uuid(), polaImage);

    if (imageUploadError) {
      console.error("Error uploading image:", imageUploadError.message);
      return;
    }
    const { data, error } = await supabase.from("pola").upsert([
      {
        nama: pola.nama,
        image_url: imageUploadData.path,
      },
    ]);

    if (error) {
      console.error("Error adding pola:", error.message);
    } else {
      setLoading(false);
      getPola();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan",
        confirmButtonText: "OK",
      });
      console.log("Pola added successfully:", data);
      // window.location.reload();
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-align-center">
          <form>
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input
                type="text"
                className="form-control"
                value={pola.nama}
                onChange={(e) => setPola({ ...pola, nama: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gambar</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
            <button
              type="button"
              className="btn bg-gradient-info"
              onClick={handleAddPola}
              style={{ float: "right" }}
            >
              {isloading ? <Spinner animation="border" size="sm" /> : "Kirim"}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalDetail;
