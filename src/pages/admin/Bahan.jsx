import React, { useState, useEffect, useRef } from "react";
import supabase from "../../config/clientSupabase";
import { Navbar, Sidebar, Footer } from "../../components/admin";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { ModalDetail, ModalTambah } from "../../components/admin/ModalBahan";

const Bahan = () => {
  const [asideIsActive, setAsideIsActive] = useState(false);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [idImage, setIdImage] = useState(null);

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
  const getBahans = async () => {
    const { data, error } = await supabase.from("bahan").select("*");
    if (!error) {
      setData(data);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    getBahans();
  }, []);
  const getBahanById = async (id) => {
    const { data, error } = await supabase.from("bahan").select().eq("id", id);
    if (!error) {
      return data;
    } else {
      console.log("error");
    }
  };

  // menghapus data bahan
  const deleteData = (id) => {
    Swal.fire({
      title: "Apakah yakin akan dihapus ?",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        getBahanById(id)
          .then(async (result) => {
            const { data: dataDeletFile, error: errorDeletFile } =
              await supabase.storage
                .from("images")
                .remove([result[0].image_url]);
            const { error } = await supabase
              .from("bahan")
              .delete()
              .eq("id", id);
            if (!error && !errorDeletFile) {
              console.log(dataDeletFile);
              getBahans();
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

  // kolom data table
  const columns = [
    {
      name: "Nama",
      center: "true",
      width: windowSize.current[0] < 500 ? "80px" : "",
      selector: (row) => row.nama,
      style: { textAlign: "center" },
    },
    {
      name: "Deskripsi",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => row.deskripsi,
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
      <main className="main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg ">
        <Navbar handleButtonClick={handleButtonClick} title={"BAHAN"} />
        <div className="container-fluid">
          <div className="bg-gradient-default rounded-top mt-3 pt-3 align-items-center">
            <div className="row">
              <div className="col-6">
                <h4 className="pl-2 fw-bold">Data Bahan</h4>
              </div>
              <div className="col-6 d-flex justify-content-end">
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
          <DataTable
            columns={columns}
            data={data}
            striped
            highlightOnHover
            fixedHeader
            pagination
            progressPending={data ? false : true}
          />
        </div>
        {modalType !== "tambah" ? (
          <ModalDetail
            show={showModal}
            modalType={modalType}
            getBahans={getBahans}
            handleClose={() => setShowModal(false)}
            id={idImage}
          />
        ) : (
          <ModalTambah
            show={showModal}
            modalType={modalType}
            getBahans={getBahans}
            handleClose={() => setShowModal(false)}
          />
        )}
        <Footer />
      </main>
    </>
  );
};

export default Bahan;
