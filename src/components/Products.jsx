import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import supabase from "../config/clientSupabase";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CDN_URL =
  "https://lwaeqdokbnvduhnprtic.supabase.co/storage/v1/object/public/images/";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (!error) {
        setData(data);
        // setFilter(await response.json());
        setLoading(false);
      } else {
        console.log("error");
      }
    };

    getProducts();
  }, []);
  const Loading = () => {
    return (
      <>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        {data.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100" key={product.id}>
                <img
                  className="card-img-top p-3"
                  src={CDN_URL + product.image_url}
                  alt="Card"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}...</h5>
                  <p className="card-text">
                    {product.name.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">Rp. {product.price}</li>
                  {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li> */}
                </ul>
                <div className="card-body">
                  <a
                    href={`https://wa.me/6285927532252?&text=Halo%2C%20saya%20lihat%20Website%20Anda%20dan%20tertarik%20membeli%20produk%20%5B${product.name}%5D.%0ADapatkah%20Anda%20membantu%20saya%3F`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </a>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Produk Kami</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
