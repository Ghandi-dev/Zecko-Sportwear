import React, { useState, useEffect, useRef } from "react";
import supabase from "../../config/clientSupabase";
import { Navbar, Sidebar, Footer } from "../../components/admin";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { ModalDetail, ModalTambah } from "../../components/admin/ModalProduct";
import { FormatRupiah } from "@arismun/format-rupiah";

const Pola = () => {
  return (
    <>
      <h1>ini halaman pola</h1>
    </>
  );
};

export default Pola;
