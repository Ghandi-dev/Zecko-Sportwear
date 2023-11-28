/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="container my-3 py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
              <h4 className="p-3 display-5">404: Page Not Found</h4>
              {/* eslint-disable-next-line */}
              <Link
                to="#"
                onClick={() => window.history.back()}
                className="btn  btn-outline-dark mx-4"
              >
                <i className="fa fa-arrow-left"></i> Ke Halaman Sebelumnya
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
