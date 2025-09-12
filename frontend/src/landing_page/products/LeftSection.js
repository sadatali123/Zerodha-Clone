import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row mx-5" style={{ marginTop: "70px", alignItems:"center" }}>
        <div className="col-6 p-4">
          <img src={imageURL} />
        </div>

        <div className="col-1"></div>

        <div className="col-5 p-5">
          <h1 className="fs-3">{productName}</h1>
          <p>{productDescription}</p>
          <div className="d-flex justify-content-start fs-6 fw-medium">
            <a style={{ textDecoration: "none" }} href={tryDemo}>
              TryDemo →
            </a>
            <a style={{ textDecoration: "none", marginLeft: "70px" }}
              href={learnMore} >
              Learn More →
            </a>
          </div>

          <div className="mt-4">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore} style={{marginLeft:"20px"}}>
              <img src="media/images/appstoreBadge.svg" />
            </a> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
