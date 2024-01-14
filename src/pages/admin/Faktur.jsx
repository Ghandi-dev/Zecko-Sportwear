import React, { useEffect, useState, useRef } from "react";
import { Navbar, Footer, Sidebar } from "../../components/admin";
import supabase from "../../config/clientSupabase";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";
import { FormatRupiah } from "@arismun/format-rupiah";
const value = localStorage.getItem("sb-lwaeqdokbnvduhnprtic-auth-token");
const dataUser = JSON.parse(value);

const pageStyle = `
    @page {
      size: A4; /* Ukuran kertas */
      margin: 20mm 15mm; /* Margin kertas */
    }
    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      img{
        width:100px
      }
    }
  `;

const Faktur = () => {
  const componentRef = useRef();
  const [dataFaktur, setDataFaktur] = useState({
    id: "",
    no: "",
    nama_pelanggan: "",
    tanggal: "",
    nama_barang: "",
    qty: 0,
    harga_satuan: 0,
    telah_dibayar: 0,
    bayar: 0,
    sisa: 0,
    sisa_bayar: 0,
  });
  const [pemesanan, setPemesanan] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [asideIsActive, setAsideIsActive] = useState(false);
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
  // mengambil data pesanan
  const getPemesanan = async () => {
    const { data, error } = await supabase
      .from("pemesanan")
      .select("*")
      .eq("isFinish", "false")
      .order("id", { ascending: false });
    if (!error) {
      setPemesanan(data);
    } else {
      console.log(error);
    }
  };
  // mengambil data user
  const getUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", dataUser.user.id);

    if (!error) {
      setAdmin(data[0].first_name);
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    getPemesanan();
    getUser();
    // eslint-disable-next-line
  }, []);

  const handleFaktur = (data) => {
    const temp = pemesanan.filter((item) => item.id === data);
    const tempSisa = temp[0].harga * temp[0].qty - temp[0].sisa_bayar;
    setDataFaktur({
      ...dataFaktur,
      nama_pelanggan: temp[0].nama,
      qty: temp[0].qty,
      no: 1,
      id: data,
      sisa: temp[0].harga * temp[0].qty - tempSisa,
      telah_dibayar: tempSisa,
      sisa_bayar: temp[0].sisa_bayar,
      harga_satuan: temp[0].harga,
    });
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("pemesanan")
      .update({
        sisa_bayar: dataFaktur.sisa - dataFaktur.bayar,
        harga: dataFaktur.harga_satuan,
        isFinish: dataFaktur.sisa - dataFaktur.bayar === 0 ? true : false,
      })
      .eq("id", dataFaktur.id);

    if (error) {
      console.error("Error edit product:", error.message);
    } else {
      getPemesanan();
      Swal.fire({
        icon: "success",
        title: "Data berhasil diedit",
        confirmButtonText: "OK",
      });
    }
  };

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
        <Navbar handleButtonClick={handleButtonClick} title={"FAKTUR"} />
        <div className="row">
          <div className="col-lg-12 mb-lg-0 mb-4">
            <div className="card mx-4 my-4">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-body p-3" ref={componentRef}>
                        <div className="row justify-content-between">
                          <div className="col-lg-2">
                            <div
                              className="position-relative d-flex align-items-center justify-content-center "
                              style={{ height: 100 }}
                            >
                              <img
                                className=""
                                style={{ width: 100 }}
                                src="../assets/img/LOGO BIRU.png"
                                alt="rocket"
                              />
                            </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="position-relative d-flex align-items-center justify-content-center h-100">
                              <h2 className="mt-4">FAKTUR PEMBAYARAN</h2>
                            </div>
                          </div>
                          <div className="col-lg-2">
                            <div className="position-relative d-flex align-items-center justify-content-center h-100">
                              <img
                                className=""
                                style={{ width: 100 }}
                                src="../assets/img/LOGO BIRU2.png"
                                alt="rocket"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4 mx-1">
                          <div className="card">
                            <div className="table-responsive">
                              <table>
                                <tbody>
                                  <tr>
                                    <td>Nama</td>
                                    <td
                                      style={{ width: 50, textAlign: "center" }}
                                    >
                                      :
                                    </td>
                                    <td>{dataFaktur.nama_pelanggan}</td>
                                  </tr>
                                  <tr>
                                    <td>Tanggal</td>
                                    <td
                                      style={{ width: 50, textAlign: "center" }}
                                    >
                                      :
                                    </td>
                                    <td>{dataFaktur.tanggal}</td>
                                  </tr>
                                </tbody>
                              </table>
                              <table
                                className="table align-items-center mb-0"
                                border={4}
                              >
                                <thead>
                                  <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      No
                                    </th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                      Nama Barang
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      qty
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      harga satuan
                                    </th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                      jumlah
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="px-4">{dataFaktur.no}</td>
                                    <td>{dataFaktur.nama_barang}</td>
                                    <td className="text-center">
                                      {dataFaktur.qty}
                                    </td>
                                    <td className="text-center">
                                      <FormatRupiah
                                        value={dataFaktur.harga_satuan}
                                      />
                                    </td>
                                    <td className="text-center">
                                      <FormatRupiah
                                        value={
                                          dataFaktur.qty *
                                          dataFaktur.harga_satuan
                                        }
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <hr className="mb-0 mt-0" />
                              <table style={{ marginLeft: 200 }}>
                                <tbody>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      style={{ width: 570, textAlign: "right" }}
                                    >
                                      Total
                                    </td>
                                    <td style={{ width: 1 }}>:</td>
                                    <td
                                      style={{
                                        width: 140,
                                        textAlign: "center",
                                      }}
                                    >
                                      <FormatRupiah
                                        value={
                                          dataFaktur.qty *
                                          dataFaktur.harga_satuan
                                        }
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      style={{ textAlign: "right" }}
                                    >
                                      Telah Dibayar
                                    </td>
                                    <td style={{ width: 1 }}>:</td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      <FormatRupiah
                                        value={dataFaktur.telah_dibayar}
                                      />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      style={{ textAlign: "right" }}
                                    >
                                      Bayar
                                    </td>
                                    <td style={{ width: 1 }}>:</td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      <FormatRupiah value={dataFaktur.bayar} />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      colSpan={4}
                                      style={{ textAlign: "right" }}
                                    >
                                      Sisa
                                    </td>
                                    <td style={{ width: 1 }}>:</td>
                                    <td
                                      style={{
                                        textAlign: "center",
                                      }}
                                    >
                                      <FormatRupiah
                                        value={
                                          dataFaktur.sisa - dataFaktur.bayar
                                        }
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-4 justify-content-end">
                          <div className="col-3 text-center">
                            <h4>Admin</h4>
                            <img
                              src={
                                dataFaktur.sisa - dataFaktur.bayar === 0
                                  ? "../assets/img/lunas.png"
                                  : "../assets/img/tanda_tangan.png"
                              }
                              className="position-absolute h-100 w-50 top-0 d-lg-block d-none mx-3"
                              alt="waves"
                              style={{ opacity: 0.7 }} // Atur nilai opacity di sini
                            />
                            <h4 className="mt-7">{admin}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 ms-auto text-center mt-5 mt-lg-0">
                    <div className="bg-gradient-info border-radius-lg h-100">
                      <img
                        src="../assets/img/shapes/waves-white.svg"
                        className="position-absolute h-100 w-50 top-0 d-lg-block d-none"
                        alt="waves"
                      />
                      <div className="position-relative d-flex align-items-center justify-content-center h-100 mx-4">
                        <form>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label className="text-white text-sm">
                                  Example select
                                </label>
                                <select
                                  className="form-control"
                                  value={dataFaktur.selectOption}
                                  onChange={(event) => {
                                    handleFaktur(event.target.value);
                                  }}
                                >
                                  <option value={""}>
                                    Pilih Data Pemesanan
                                  </option>
                                  {pemesanan.map((data, index) => (
                                    <option key={index} value={data.id}>
                                      {data.nama}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="text-white text-sm">
                                  Nama Barang
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={dataFaktur.nama_barang}
                                  onChange={(e) =>
                                    setDataFaktur({
                                      ...dataFaktur,
                                      nama_barang: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="text-white text-sm">
                                  Tanggal
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={dataFaktur.tanggal}
                                  onChange={(e) =>
                                    setDataFaktur({
                                      ...dataFaktur,
                                      tanggal: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="text-white text-sm">
                                  Harga Satuan
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={dataFaktur.harga_satuan}
                                  onChange={(e) =>
                                    setDataFaktur({
                                      ...dataFaktur,
                                      harga_satuan: e.target.value,
                                      sisa:
                                        dataFaktur.qty * e.target.value -
                                        dataFaktur.telah_dibayar,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label className="text-white text-sm">
                                  Bayar
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={dataFaktur.bayar}
                                  onChange={(e) => {
                                    setDataFaktur({
                                      ...dataFaktur,
                                      bayar: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row mx-1 mt-3">
                            <ReactToPrint
                              trigger={() => (
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                >
                                  Print
                                </button>
                              )}
                              content={() => componentRef.current}
                              copyStyles={true}
                              pageStyle={pageStyle}
                              onBeforePrint={handleSave}
                              onAfterPrint={() => window.location.reload()}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow-1"></div> {/* Spacer */}
        <Footer />
      </main>
    </>
  );
};

export default Faktur;
