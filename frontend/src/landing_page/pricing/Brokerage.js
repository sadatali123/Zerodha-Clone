import React from "react";
import { useState } from "react";


function Brokerage() {

  const [activeTab, setActiveTab] = useState("equity");

  return (
    <div className="container" style={{ marginTop: "180px" }}>
      <div className="row d-flex justify-content-evenly text-muted">
        <div className="col-3 text-center">
          <img
            src="media\images\pricing0.svg"
            alt="zerodha fund house"
            style={{ width: "80%" }}
          />
          <h3>Free equity delivery</h3>
          <p className="mt-4">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>

        <div className="col-4  text-center">
          <img
            src="media\images\other-trades.svg"
            alt="sensibull-Logo"
            style={{ width: "60%" }}
          />
          <h3>Intraday and F&O trades</h3>
          <p className="mt-4">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        <div className="col-3 text-center">
          <img
            src="media\images\pricing0.svg"
            alt="zerodha fund house"
            style={{ width: "80%" }}
          />
          <h3>Free direct MF</h3>
          <p className="mt-3">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>

      

      {/* table content */}
       <div className="container my-4">
     
      <ul className="nav nav-tabs mb-4"  style={{ marginTop: "100px" }}>
        <li className="nav-item fs-4">
          <button
            className={`nav-link ${activeTab === "equity" ? "active" : ""}`}
            onClick={() => setActiveTab("equity")}
          >
            Equity
          </button>
        </li>
        <li className="nav-item fs-4">
          <button
            className={`nav-link ${activeTab === "currency" ? "active" : ""}`}
            onClick={() => setActiveTab("currency")}
          >
            Currency
          </button>
        </li>
        <li className="nav-item fs-4">
          <button className="nav-link disabled">Commodity</button>
        </li>
      </ul>

      {/* Equity Table */}
      {activeTab === "equity" && (
        <div className="table-responsive">
          <table className="table table-bordered  text-center align-middle">
            <thead className="">
              <tr>
                <th></th>
                <th>Equity delivery</th>
                <th>Equity intraday</th>
                <th>F&amp;O - Futures</th>
                <th>F&amp;O - Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold text-start">Brokerage</td>
                <td>Zero Brokerage</td>
                <td>0.03% or Rs. 20/executed order whichever is lower</td>
                <td>0.03% or Rs. 20/executed order whichever is lower</td>
                <td>Flat Rs. 20 per executed order</td>
              </tr>
              <tr>
                <td className="fw-bold text-start">STT/CTT</td>
                <td>0.1% on buy &amp; sell</td>
                <td>0.025% on the sell side</td>
                <td>0.02% on the sell side</td>
                <td className="text-start">
                  <ul className="mb-0">
                    <li>
                      0.125% of the intrinsic value on options that are bought
                      and exercised
                    </li>
                    <li>0.1% on sell side (on premium)</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Transaction charges</td>
                <td>
                  NSE: 0.00297% <br /> BSE: 0.00375%
                </td>
                <td>
                  NSE: 0.00297% <br /> BSE: 0.00375%
                </td>
                <td>
                  NSE: 0.00173% <br /> BSE: 0
                </td>
                <td>
                  NSE: 0.03503% (on premium) <br /> BSE: 0.0325% (on premium)
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">GST</td>
                <td>
                  18% on (brokerage + SEBI charges + transaction charges)
                </td>
                <td>
                  18% on (brokerage + SEBI charges + transaction charges)
                </td>
                <td>
                  18% on (brokerage + SEBI charges + transaction charges)
                </td>
                <td>
                  18% on (brokerage + SEBI charges + transaction charges)
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">SEBI charges</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Stamp charges</td>
                <td>0.015% or ₹1500 / crore on buy side</td>
                <td>0.003% or ₹300 / crore on buy side</td>
                <td>0.002% or ₹200 / crore on buy side</td>
                <td>0.003% or ₹300 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* currency table */}
      {activeTab === "currency" && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light text-center">
              <tr>
                <th></th>
                <th>Currency futures</th>
                <th>Currency options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-bold text-start">Brokerage</td>
                <td>0.03% or ₹20/executed order whichever is lower</td>
                <td>₹20/executed order</td>
              </tr>
              <tr>
                <td className="fw-bold text-start">STT/CTT</td>
                <td>No STT</td>
                <td>No STT</td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Transaction charges</td>
                <td>
                  NSE: 0.00035% <br /> BSE: 0.00045%
                </td>
                <td>
                  NSE: 0.0311% <br /> BSE: 0.001%
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">GST</td>
                <td>
                  18% on (brokerage + SEBI charges + transaction charges)
                </td>
                <td>
                  18% on (brokerage + SEBI charges + transaction charges)
                </td>
              </tr>
              <tr>
                <td className="fw-bold text-start">SEBI charges</td>
                <td>₹10 / crore</td>
                <td>₹10 / crore</td>
              </tr>
              <tr>
                <td className="fw-bold text-start">Stamp charges</td>
                <td>0.0001% or ₹10 / crore on buy side</td>
                <td>0.0001% or ₹10 / crore on buy side</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
  );
}

export default Brokerage;
