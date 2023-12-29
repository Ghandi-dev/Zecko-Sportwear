import React, { useEffect, useState, useRef } from "react";
import { Navbar, Footer, Sidebar } from "../../components/admin";
import supabase from "../../config/clientSupabase";
import DataTable from "react-data-table-component";
import { ModalEdit } from "../../components/admin/ModalPesanan";
import Swal from "sweetalert2";

const Pesanan = () => {
  const [asideIsActive, setAsideIsActive] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "",
    id: "",
  });
  const [dataPemesanan, setDataPemesanan] = useState({
    total: 0,
    selesai: 0,
    belum: 0,
    data: [],
  });
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    selesai: false,
    belum: false,
  });

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

  // filter data table
  const filtering = (data) => {
    let dataFiltering = [];
    if (filter.selesai && filter.belum === false) {
      dataFiltering =
        data.nama.toLowerCase().includes(search) && data.isFinish === true;
    } else if (filter.belum && filter.selesai === false) {
      dataFiltering =
        data.nama.toLowerCase().includes(search) && data.isFinish === false;
    } else {
      dataFiltering = data.nama.toLowerCase().includes(search);
    }
    return dataFiltering;
  };

  // mengambil data pesanan
  const getPemesanan = async () => {
    const { data, error } = await supabase
      .from("pemesanan")
      .select("*")
      .order("id", { ascending: false });
    if (!error) {
      setDataPemesanan({
        ...dataPemesanan,
        selesai: data.filter((item) => item.isFinish === true).length,
        total: data.length,
        belum: data.filter((item) => item.isFinish === false).length,
        data: data,
      });
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    getPemesanan();
    // eslint-disable-next-line
  }, []);

  // update data pemesanan
  const updateDataPemesanan = async (row) => {
    Swal.fire({
      title: "Apakah yakin akan diubah ?",
      showDenyButton: true,
      confirmButtonText: "Ubah",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("pemesanan")
          .update({
            nama: row.nama,
            no_wa: row.no_wa,
            bahan: row.bahan,
            pola: row.pola,
            qty: row.qty,
            isFinish: !row.isFinish,
          })
          .eq("id", row.id);
        if (!error) {
          getPemesanan();
          Swal.fire({
            icon: "success",
            title: "Data berhasil diubah",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  // hapus data pemesanan
  const deleteDataPemesanan = async (row) => {
    Swal.fire({
      title: "Apakah yakin akan dhapus ?",
      showDenyButton: true,
      confirmButtonText: "Hapus",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("pemesanan")
          .delete()
          .eq("id", row.id);
        if (!error) {
          getPemesanan();
          Swal.fire({
            icon: "success",
            title: "Data berhasil dihapus",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  // data heading tabel
  const columns = [
    {
      name: "Nama",
      center: "true",
      width: windowSize.current[0] < 500 ? "80px" : "",
      selector: (row) => row.nama,
      style: { textAlign: "center" },
    },
    {
      name: "No WA",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => row.no_wa,
    },
    {
      name: "Pola",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => row.pola,
    },
    {
      name: "Bahan",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => row.bahan,
    },
    {
      name: "Jumlah",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => row.qty,
    },
    {
      name: "Tanggal",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => row.tgl,
    },
    {
      name: "Selesai",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) =>
        row.isFinish === true ? (
          <button
            className="btn bg-gradient-success btn-sm mt-3 mr-2"
            type="button"
            onClick={() => {
              updateDataPemesanan(row);
            }}
          >
            Selesai
          </button>
        ) : (
          <button
            className="btn bg-gradient-secondary btn-sm mt-3 mr-2"
            type="button"
            onClick={() => {
              updateDataPemesanan(row);
            }}
          >
            Belum
          </button>
        ),
    },
    {
      name: "Aksi",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) => (
        <div className="d-flex">
          <button
            type="button"
            className="btn bg-gradient-warning btn-sm mt-3 mr-2"
            onClick={() => {
              return setModal({
                ...modal,
                show: true,
                type: "EDIT",
                id: row.id,
              });
            }}
          >
            Edit
          </button>
          <button
            className="btn bg-gradient-danger btn-sm mt-3 mr-2"
            type="button"
            onClick={() => {
              deleteDataPemesanan(row);
            }}
          >
            hapus
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
        <Navbar handleButtonClick={handleButtonClick} title={"PESANAN"} />
        <div className="card card-frame mx-4 my-4">
          <div className="card-body">
            <div className="container-fluid p-0">
              {/* form search */}
              <div className="row mt-lg-0">
                <div className="col-6 col-lg-2">
                  <form className="mt-1">
                    <div className="form-group">
                      <input
                        type="text"
                        // value={search}
                        className="form-control"
                        placeholder="Cari...."
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="col-6 col-lg-2">
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      onChange={() =>
                        setFilter({ ...filter, selesai: !filter.selesai })
                      }
                    />
                    <label className="form-check-label">selesai</label>
                  </div>
                  <div className="form-check ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox2"
                      onChange={() =>
                        setFilter({ ...filter, belum: !filter.belum })
                      }
                    />
                    <label className="form-check-label">belum selesai</label>
                  </div>
                </div>
              </div>
            </div>
            <DataTable
              columns={columns}
              data={dataPemesanan.data.filter((item) => {
                return search.toLowerCase() === "" &&
                  filter.selesai === false &&
                  filter.belum === false
                  ? item
                  : filtering(item);
              })}
              striped
              highlightOnHover
              fixedHeader
              pagination
              progressPending={dataPemesanan.data ? false : true}
            />
          </div>
        </div>
        <ModalEdit
          show={modal.show}
          modalType={modal.type}
          id={modal.id}
          handleClose={() => setModal({ ...modal, show: false })}
          getPemesanan={getPemesanan}
        />
        <div className="flex-grow-1"></div> {/* Spacer */}
        <Footer />
      </main>
    </>
  );
};

export default Pesanan;
