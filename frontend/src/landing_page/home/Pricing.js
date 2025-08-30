import React from "react";
import "../../index.css";

function Pricing() {
  return (
    <div className="container">
      <div className="row mx-5">
        <div className="col-5">
          <h2>Unbeatable pricing</h2>
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
            <p>
              Free account
              <br></br>
              opening
            </p>
          </div>
          <div className="pricing-box">
            <img src="media\images\pricing0.svg" alt="pricing" />
            <p>
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
      <div className="row">
        <div className="col-6">
          <div>
            <img src="media\images\education.svg" alt="Varsity" />
          </div>
        </div>
        <div className="col-6">
          <h2>Free and open market education</h2>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
