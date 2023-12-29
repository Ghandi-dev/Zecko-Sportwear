import React, { useState, useEffect, useRef } from "react";
import supabase from "../../config/clientSupabase";
import { Navbar, Sidebar, Footer } from "../../components/admin";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { ModalDetail, ModalTambah } from "../../components/admin/ModalProduct";
import { FormatRupiah } from "@arismun/format-rupiah";

const ProductAdmin = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [data, setData] = useState([]);
  const [asideIsActive, setAsideIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const [search, setSearch] = useState("");

  // handle untuk membuka sidebar
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

  //   mengambil data product
  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (!error) {
      setData(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  // mengambil data product by id
  const getProductById = async (id) => {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", id);
    if (!error) {
      return data;
    } else {
      console.log("error");
    }
  };

  //   hapus data
  const deleteData = (id) => {
    Swal.fire({
      title: "Apakah yakin akan dihapus ?",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        getProductById(id)
          .then(async (result) => {
            const { data: dataDeletProduct, error: errorDeletProduct } =
              await supabase.storage
                .from("images")
                .remove([result[0].image_url]);
            const { error } = await supabase
              .from("products")
              .delete()
              .eq("id", id);
            if (!error && !errorDeletProduct) {
              console.log(dataDeletProduct);
              getProducts();
              Swal.fire({
                icon: "success",
                title: "Data berhasil dihapus",
                confirmButtonText: "OK",
              });
            }
          })
          .catch((error) => {
            // Tangani error jika terjadi
            console.error(error);
          });
      }
    });
  };

  //   inisialisasi data table
  const columns = [
    {
      name: "Nama",
      center: "true",
      width: windowSize.current[0] < 500 ? "80px" : "",
      selector: (row) => row.name,
    },
    {
      name: "Harga",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => <FormatRupiah value={row.price} />,
    },
    {
      name: "Aksi",
      center: "true",
      selector: (row) => (
        <div className="d-flex">
          <button
            type="button"
            className="btn bg-gradient-info btn-sm mt-3 mr-2"
            style={{ fontSize: 10 }}
            onClick={() => {
              return (
                setShowModal(true), setModalType("detail"), setIdImage(row.id)
              );
            }}
          >
            Detail
          </button>
          <button
            type="button"
            className="btn bg-gradient-warning btn-sm mt-3 mr-2"
            style={{ fontSize: 10 }}
            onClick={() => {
              return (
                setShowModal(true), setModalType("edit"), setIdImage(row.id)
              );
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn bg-gradient-danger btn-sm mt-3 "
            style={{ fontSize: 10 }}
            onClick={() => deleteData(row.id)}
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Sidebar isActive={asideIsActive} />
      <main
        className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg d-flex flex-column"
        style={{
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <Navbar handleButtonClick={handleButtonClick} title={"PRODUCT"} />
        <div className="container-fluid">
          <div className="card card-frame mx-4 my-4">
            <div className="card-body">
              <div className="bg-gradient-default rounded-top align-items-center">
                <div className="row">
                  <div className="col-md-12 col-lg-2">
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          // value={search}
                          className="form-control"
                          placeholder="Cari produk"
                          onChange={(e) =>
                            setSearch(e.target.value.toLowerCase())
                          }
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-10 d-flex justify-content-end">
                    <button
                      className="btn bg-gradient-info btn-sm mr-2"
                      onClick={() => {
                        // eslint-disable-next-line
                        return setModalType("tambah"), setShowModal(true);
                      }}
                    >
                      tambah
                    </button>
                  </div>
                </div>
              </div>
              {/* form search */}
              <DataTable
                columns={columns}
                data={data.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(search);
                })}
                striped
                highlightOnHover
                fixedHeader
                pagination
                progressPending={data ? false : true}
              />
            </div>
          </div>
        </div>
        {modalType !== "tambah" ? (
          <ModalDetail
            show={showModal}
            modalType={modalType}
            getProducts={getProducts}
            handleClose={() => setShowModal(false)}
            id={idImage}
          />
        ) : (
          <ModalTambah
            show={showModal}
            modalType={modalType}
            getProducts={getProducts}
            handleClose={() => setShowModal(false)}
          />
        )}
        <div className="flex-grow-1"></div> {/* Spacer */}
        <Footer />
      </main>
    </>
  );
};

export default ProductAdmin;
