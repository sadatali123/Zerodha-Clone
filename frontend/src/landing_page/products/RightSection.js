import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <div className="container">
      <div className="row mx-5" style={{ marginTop: "70px", alignItems: "center" }} >
        <div className="col-4 p-5 mb-5">
          <h1 className="fs-3">{productName}</h1>
          <p className="mt-4">{productDescription}</p>
          <div className="d-flex justify-content-start fs-6 fw-medium">
            <a style={{ textDecoration: "none", marginTop: "10px" }}
              href={learnMore}>
              Learn More →
            </a>
          </div>
        </div>

        <div className="col-1"></div>

        <div className="col-6 p-4">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
