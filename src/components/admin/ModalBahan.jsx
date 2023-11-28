// Import Swiper React components
import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import supabase from "../../config/clientSupabase";
import Swal from "sweetalert2";
import uuid from "react-uuid";

import "./modal.css";
const CDN_URL = process.env.REACT_APP_CDN_URL;

export const ModalDetail = ({
  show,
  handleClose,
  modalType,
  id,
  getBahans,
}) => {
  const [bahanName, setBahanName] = useState("");
  const [bahanDeskripsi, setBahanDeskripsi] = useState("");
  const [bahanImage, setBahanImage] = useState(null);
  const [imageUploadData, setImageUploadData] = useState(null);
  const [dataBahan, setDataBahan] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBahanImage(file);
  };

  const handleUpdateBahan = async () => {
    if (bahanImage !== null) {
      const { data: imageUploadData, error: imageUploadError } =
        await supabase.storage
          .from("images")
          .upload(`bahan/` + uuid(), bahanImage);
      setImageUploadData(imageUploadData);
      if (imageUploadError) {
        console.error("Error uploading image:", imageUploadError.message);
        return;
      }
    }
    const { error } = await supabase
      .from("bahan")
      .update({
        nama: bahanName,
        deskripsi: bahanDeskripsi,
        image_url:
          bahanImage === null ? dataBahan.image_url : imageUploadData.path,
      })
      .eq("id", id);

    if (error) {
      console.error("Error adding bahan:", error.message);
    } else {
      getBahans();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan",
        confirmButtonText: "OK",
      });
    }
  };

  const getBahansById = async () => {
    const { data, error } = await supabase.from("bahan").select().eq("id", id);
    if (!error) {
      setDataBahan(data[0]);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (show) {
      getBahansById();
    }
  }, [show]);
  useEffect(() => {
    if (dataBahan.nama !== undefined && dataBahan.deskripsi !== undefined) {
      setBahanName(dataBahan.nama);
      setBahanDeskripsi(dataBahan.deskripsi);
    }
  }, [dataBahan]);
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
                  dataBahan.image_url !== undefined
                    ? CDN_URL + dataBahan.image_url
                    : ""
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
                  <li className="list-group-item">Nama : {dataBahan.name}</li>
                  <li className="list-group-item">
                    Deskripsi : {dataBahan.deskripsi}
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <form>
                <div className="mb-3">
                  <label className="form-label">Nama Bahan:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bahanName}
                    onChange={(e) => setBahanName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Deskripsi Bahan:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={bahanDeskripsi}
                    onChange={(e) => setBahanDeskripsi(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Bahan Image:</label>
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
                  onClick={handleUpdateBahan}
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

export const ModalTambah = ({ show, handleClose, modalType, getBahans }) => {
  const [bahanName, setBahanName] = useState("");
  const [bahanDeskripsi, setBahanDeskripsi] = useState("");
  const [bahanImage, setBahanImage] = useState(null);
  const [isloading, setLoading] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBahanImage(file);
  };

  const handleAddBahan = async () => {
    setLoading(true);
    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage
        .from("images")
        .upload(`bahan/` + uuid(), bahanImage);

    if (imageUploadError) {
      console.error("Error uploading image:", imageUploadError.message);
      return;
    }
    const { data, error } = await supabase.from("bahan").upsert([
      {
        nama: bahanName,
        deskripsi: bahanDeskripsi,
        image_url: imageUploadData.path,
      },
    ]);

    if (error) {
      console.error("Error adding bahan:", error.message);
    } else {
      setLoading(false);
      getBahans();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan",
        confirmButtonText: "OK",
      });
      console.log("Bahan added successfully:", data);
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
                value={bahanName}
                onChange={(e) => setBahanName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                value={bahanDeskripsi}
                onChange={(e) => setBahanDeskripsi(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Gambar</label>
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
              onClick={handleAddBahan}
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
