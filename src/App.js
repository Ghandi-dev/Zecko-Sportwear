import React, { useEffect, useState } from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Order from "./pages/user/Order";
import supabase from "./config/clientSupabase";

import { Home, Products, AboutPage, Login, PageNotFound } from "./pages/user";

import { Dashboard, ProductAdmin, Bahan, Pola, Faktur } from "./pages/admin";

const App = () => {
  const [session, setSession] = useState({});
  useEffect(() => {
    const checkUserLogin = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!error) {
        setSession(data);
      } else {
        console.log(error);
      }
    };
    checkUserLogin();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* admin */}
        <Route
          path="/dashboard"
          element={session.session !== null ? <Dashboard /> : <Login />}
        />
        <Route
          path="/admin/product"
          element={session.session !== null ? <ProductAdmin /> : <Login />}
        />
        <Route
          path="/admin/bahan"
          element={session.session !== null ? <Bahan /> : <Login />}
        />
        <Route
          path="/admin/pola"
          element={session.session !== null ? <Pola /> : <Login />}
        />
        <Route
          path="/admin/faktur"
          element={session.session !== null ? <Faktur /> : <Login />}
        />
        {/* user */}
        <Route path="/product" element={<Products />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/product/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
