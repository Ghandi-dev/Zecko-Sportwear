import React, { useEffect, useState } from "react";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
import Order from "./pages/user/Order";
import supabase from "./config/clientSupabase";

import {
  Home,
  Products,
  AboutPage,
  Cart,
  Login,
  Register,
  Checkout,
  PageNotFound,
} from "./pages/user";

import { Dashboard, ProductAdmin, Bahan, Pola } from "./pages/admin";

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
      <Provider store={store}>
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
          {/* user */}
          <Route path="/product" element={<Products />} />
          <Route path="/order" element={<Order />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/product/*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
