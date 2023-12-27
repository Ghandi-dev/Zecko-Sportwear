import React, { useEffect, useState, useRef } from "react";
import { Navbar, Footer, Sidebar } from "../../components/admin";
import supabase from "../../config/clientSupabase";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [asideIsActive, setAsideIsActive] = useState(false);
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
      name: "Selesai",
      center: "true",
      width: windowSize.current[0] < 500 ? "110px" : "",
      selector: (row) =>
        row.isFinish === true ? (
          <button
            className="btn bg-gradient-success mb-0"
            type="button"
            onClick={() => {
              updateDataPemesanan(row);
            }}
          >
            Selesai
          </button>
        ) : (
          <button
            className="btn bg-gradient-secondary mb-0 text-light"
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
        <button
          className="btn bg-gradient-danger mb-0 text-light"
          type="button"
          onClick={() => {
            deleteDataPemesanan(row);
          }}
        >
          hapus
        </button>
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
        <Navbar handleButtonClick={handleButtonClick} title={"DASHBOARD"} />
        <div className="container-fluid py-4">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Total Pesanan
                        </p>
                        <span className="text-success text-sm font-weight-bolder">
                          jumlah : {dataPemesanan.total}
                        </span>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-info shadow text-center border-radius-md">
                        <i
                          className="ni ni-money-coins text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Selesai
                        </p>
                        <span className="text-success text-sm font-weight-bolder">
                          jumlah : {dataPemesanan.selesai}
                        </span>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-success shadow text-center border-radius-md">
                        <i
                          className="fa-solid fa-check text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                          Belum Selesai
                        </p>
                        <span className="text-success text-sm font-weight-bolder">
                          jumlah : {dataPemesanan.belum}
                        </span>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-secondary shadow text-center border-radius-md">
                        <i
                          className="fa-solid fa-x text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* form search */}
          <div className="row justify-content-lg-end mt-lg-5">
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
            <div className="col-6 col-lg-1">
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
        <div className="flex-grow-1"></div> {/* Spacer */}
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
