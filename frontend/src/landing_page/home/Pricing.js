import React from "react";
import "../../index.css";

function Pricing() {
  return (
    <div className="container">
      <div className="row mx-5">
        <div className="col-5">
          <h2 className="fs-2" style={{color:"#424242"}}>Unbeatable pricing</h2>
          <p className="text-muted mt-4">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" className="" style={{ textDecoration: "none" }}>
            See Pricing <i class="fa-sharp fa-solid fa-arrow-right"></i>
          </a>
        </div>
        <div className="col-7 ml-5 mt-3">
          <div className="pricing-box">
            <img src="media\images\pricing0.svg" alt="Pricing" />
            <p className="text-muted ">
              Free account
              <br></br>
              opening
            </p>
          </div>
          <div className="pricing-box">
            <img src="media\images\pricing0.svg" alt="pricing" />
            <p className="text-muted ">
              Free equity delivery
              <br></br>
              and direct mutual funds
            </p>
          </div>
          <div className="pricing-box">
            <img src="media\images\intradayTrades.svg" alt="pricing" />
            <p>
              Intraday and
              <br></br>
              F&O
            </p>
          </div>
        </div>
      </div>

      <div className="row" style={{ height: "200px", width: "100%" }}></div>

    </div>
  );
}

export default Pricing;
