import React, { useEffect, useState } from "react";
import { Navbar, Footer, Sidebar } from "../../components/admin";
import supabase from "../../config/clientSupabase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true, // Mulai dari 0 pada sumbu Y
    },
  },
};

const hitungJumlahDataPerTanggal = (data) => {
  const dataPerTanggal = {};

  data.forEach((item) => {
    const tanggal = item.tgl;

    if (!dataPerTanggal[tanggal]) {
      dataPerTanggal[tanggal] = 1;
    } else {
      dataPerTanggal[tanggal] += 1;
    }
  });

  const hasilPerTanggal = Object.entries(dataPerTanggal).map(
    ([tgl, jumlah]) => ({
      jumlah,
      tgl,
    })
  );

  return hasilPerTanggal;
};

const Dashboard = () => {
  const [asideIsActive, setAsideIsActive] = useState(false);
  const [dataPemesanan, setDataPemesanan] = useState({
    total: 0,
    selesai: 0,
    belum: 0,
    data: [],
    grafik: [],
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
        grafik: hitungJumlahDataPerTanggal(data),
      });
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    getPemesanan();
    // eslint-disable-next-line
  }, []);

  const labels = dataPemesanan.grafik.map((item) => item.tgl).reverse();

  const data = {
    labels,
    datasets: [
      {
        label: "Grafik Pemesanan",
        data: dataPemesanan.grafik.map((item) => item.jumlah).reverse(),
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 1)`,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
        yAxisID: "y",
      },
    ],
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
        <Navbar handleButtonClick={handleButtonClick} title={"DASHBOARD"} />
        <div className="container-fluid py-4">
          <div className="row justify-content-between mx-1">
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
          <div className="card card-frame mx-2 my-4">
            <div className="card-body">
              <Line data={data} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="flex-grow-1"></div> {/* Spacer */}
        <Footer />
      </main>
    </>
  );
};

export default Dashboard;
