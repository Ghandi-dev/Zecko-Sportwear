// Import Swiper React components
import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import supabase from "../../config/clientSupabase";
import Swal from "sweetalert2";

import "./modal.css";

export const ModalEdit = ({
  show,
  handleClose,
  id,
  modalType,
  getPemesanan,
}) => {
  const [pesanan, setPesanan] = useState({
    nama: "",
    no_wa: "",
    bahan: "",
    pola: "",
    qty: 0,
    tgl: "",
  });

  // mengambil data pesanan
  const getPesanan = async () => {
    const { data, error } = await supabase
      .from("pemesanan")
      .select()
      .eq("id", id);
    if (!error) {
      setPesanan({
        ...pesanan,
        nama: data[0].nama,
        bahan: data[0].bahan,
        no_wa: data[0].no_wa,
        pola: data[0].pola,
        qty: data[0].qty,
        tgl: data[0].tgl,
      });
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    if (show) {
      getPesanan();
    }
    // eslint-disable-next-line
  }, [show]);

  const handleEdit = async () => {
    const { error } = await supabase
      .from("pemesanan")
      .update({
        nama: pesanan.nama,
        bahan: pesanan.bahan,
        no_wa: pesanan.no_wa,
        pola: pesanan.pola,
        qty: pesanan.qty,
        tgl: pesanan.tgl,
      })
      .eq("id", id);

    if (error) {
      console.error("Error edit product:", error.message);
    } else {
      getPemesanan();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        confirmButtonText: "OK",
      });
    }
  };

  const [isloading, setLoading] = useState(null);

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
                value={pesanan.nama}
                onChange={(e) =>
                  setPesanan({ ...pesanan, nama: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">No WhatsApp</label>
              <input
                type="text"
                className="form-control"
                value={pesanan.no_wa}
                onChange={(e) =>
                  setPesanan({ ...pesanan, no_wa: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Bahan</label>
              <input
                type="text"
                className="form-control"
                value={pesanan.bahan}
                onChange={(e) =>
                  setPesanan({ ...pesanan, bahan: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pola</label>
              <input
                type="text"
                className="form-control"
                value={pesanan.pola}
                onChange={(e) =>
                  setPesanan({ ...pesanan, pola: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Qty</label>
              <input
                type="number"
                className="form-control"
                value={pesanan.qty}
                onChange={(e) =>
                  setPesanan({ ...pesanan, qty: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tanggal</label>
              <input
                type="date"
                className="form-control"
                value={pesanan.tgl}
                onChange={(e) =>
                  setPesanan({ ...pesanan, tgl: e.target.value })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn bg-gradient-info"
            onClick={handleEdit}
            style={{ float: "right" }}
          >
            {isloading ? <Spinner animation="border" size="sm" /> : "Simpan"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEdit;
