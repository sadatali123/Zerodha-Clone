import React from "react";

function Education() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6 mb-5" >
          <img style={{ width: "80%", marginTop:"-70px"}}
            className="mb-5"
            src="media\images\education.svg"
            alt="Varsity"
          />
        </div>
        <div className="col-6">
          <div className="mb-5">
            <h2 className="mb-4 fs-2">Free and open market education</h2>
            <p className="text-muted">
              Varsity, the largest online stock market education book in the
              world covering <br />
              everything from the basics to advanced trading.
            </p>
            <a href="" style={{ textDecoration: "none" }}>
              Versity <i class="fa-sharp fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div>
            <p className="text-muted">
              TradingQ&A, the most active trading and investment community in
              India for <br />
              all your market related queries.
            </p>
            <a href="" style={{ textDecoration: "none" }}>
              TradingQ&A <i class="fa-sharp fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
