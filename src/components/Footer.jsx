import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mb-0 text-center bg-dark">
        <div className="d-flex align-items-center justify-content-center py-2">
          <div className="col-md-6">
            <p className="mb-3 mb-md-0 text-white">
              Made with ❤️ by{"  "}
              <a
                href="#"
                className="text-decoration-underline text-warning fs-5"
                rel="noreferrer"
              >
                Zecko
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
