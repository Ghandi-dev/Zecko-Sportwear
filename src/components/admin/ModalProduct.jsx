// Import Swiper React components
import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import supabase from "../../config/clientSupabase";
import Swal from "sweetalert2";
import uuid from "react-uuid";
import { FormatRupiah } from "@arismun/format-rupiah";
import { customLog } from "../../utils/CustomLogger";

import "./modal.css";
const CDN_URL = process.env.REACT_APP_CDN_URL;

export const ModalDetail = ({
  show,
  handleClose,
  modalType,
  id,
  getProducts,
}) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image_url: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [dataProduct, setDataProduct] = useState([]);

  // handle image pada form
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  // update data product
  const handleUpdateProduct = async () => {
    let imageUploadData = {};
    if (productImage !== null) {
      const { data: imageUpload, error: imageUploadError } =
        await supabase.storage
          .from("images")
          .upload(`product/` + uuid(), productImage);
      imageUploadData = imageUpload;
      if (imageUploadError) {
        console.error("Error uploading image:", imageUploadError.message);
        return;
      } else {
        // eslint-disable-next-line
        const { data: deletImageData, error: deletImageError } =
          await supabase.storage.from("images").remove([product.image_url]);
        deletImageError
          ? customLog("Error delete image")
          : customLog("Image berhasil dihapus");
      }
    }
    const { error } = await supabase
      .from("products")
      .update({
        name: product.name,
        price: parseFloat(product.price),
        image_url:
          productImage === null ? product.image_url : imageUploadData.path,
      })
      .eq("id", id);

    if (error) {
      console.error("Error edit product:", error.message);
    } else {
      getProducts();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        confirmButtonText: "OK",
      });
    }
  };

  // mendapatkan product by id
  const getProductsById = async () => {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", id);
    if (!error) {
      setDataProduct(data[0]);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    if (show) {
      getProductsById();
    }
    // eslint-disable-next-line
  }, [show]);
  useEffect(() => {
    if (dataProduct.name !== undefined && dataProduct.price !== undefined) {
      setProduct({
        ...product,
        name: dataProduct.name,
        price: dataProduct.price,
        image_url: dataProduct.image_url,
      });
    }
    // eslint-disable-next-line
  }, [dataProduct]);
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
                  product.image_url !== undefined
                    ? CDN_URL + product.image_url
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
                  <li className="list-group-item">Nama : {product.name}</li>
                  <li className="list-group-item">
                    Harga : {<FormatRupiah value={product.price} />}
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <form>
                <div className="mb-3">
                  <label className="form-label">Product Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={product.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Product Image:</label>
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
                  onClick={handleUpdateProduct}
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

export const ModalTambah = ({ show, handleClose, modalType, getProducts }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [isloading, setLoading] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const handleAddProduct = async () => {
    setLoading(true);
    const { data: imageUploadData, error: imageUploadError } =
      await supabase.storage
        .from("images")
        .upload(`product/` + uuid(), productImage);

    if (imageUploadError) {
      console.error("Error uploading image:", imageUploadError.message);
      return;
    }
    console.log(imageUploadData);
    const { data, error } = await supabase.from("products").upsert([
      {
        name: product.name,
        price: parseFloat(product.price),
        image_url: imageUploadData.path,
      },
    ]);

    if (error) {
      console.error("Error adding product:", error.message);
    } else {
      setLoading(false);
      getProducts();
      handleClose();
      Swal.fire({
        icon: "success",
        title: "Data berhasil ditambahkan",
        confirmButtonText: "OK",
      });
      console.log("Product added successfully:", data);
      setProduct({ ...product, name: "", price: "" });
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
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Harga</label>
              <input
                type="number"
                className="form-control"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
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
              onClick={handleAddProduct}
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
