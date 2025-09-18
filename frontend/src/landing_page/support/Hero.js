import React from "react";
import "../../index.css";

function Hero() {
  return (
    <div className="container mt-5 ">
      <div className="row">
        <h2 className="mb-4 fs-1 fw-semibold" style={{ marginLeft: "114px" }}>
          Support Portal
        </h2>
        {/* <button className="btn btn-primary"
        style={{width:"10%", marginLeft:"1060px"}}> My Tickets</button> */}
      </div>

      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <input
            style={{ height: "60px", width: "100%" }}
            type="text"
            className="form-control"
            placeholder="Eg: How do I open my account, How do I activate F&O..."
          />
        </div>
      </div>

      <div className="row mt-5">
        {/* Left Side Accordion */}
        <div className="col-1"></div>
        <div className="col-6">
          <div className="accordion" id="supportAccordion">

            {/* Account Opening */}
            <div className="accordion-item">
                <h2 className="accordion-header " id="headingOne">
                <button
                  className="accordion-button collapsed d-flex align-items-center justify-content-start gap-2 ps-1"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                 
                >
                  <i class="fa-regular fa-square-plus text-primary fs-5"></i>
                  Account Opening
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#"  style={{lineHeight:"2.5"}}>Resident individual</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Minor</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Non Resident Indian (NRI)</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Company, Partnership, HUF and LLP</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Glossary</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Zerodha Account */}
            <div className="accordion-item">
              <h2 className="accordion-header mt-3" id="headingTwo">
                <button
                  className="accordion-button collapsed d-flex align-items-center justify-content-start gap-2 ps-1 border-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                 
                >
                  <i className="fa-regular fa-circle-user fs-5  text-primary" ></i>
                  Your Zerodha Account
                </button>
              </h2>

              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Your Profile</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Account modification</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>
                        Client Master Report (CMR) and Depository Participant
                        (DP)
                      </a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Nomination</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Transfer and conversion of securities</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kite */}
            <div className="accordion-item">
                <h2 className="accordion-header mt-3" id="headingThree">
                <button
                  className="accordion-button collapsed d-flex align-items-center justify-content-start gap-2 ps-1 border-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                 
                >
                  <i class="fa-regular fa-square-plus text-primary fs-5"></i>
                  Kite
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>IPO</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Trading FAQs</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Margin Trading Facility (MTF) and Margins</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Alerts snd Nudges</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>General</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Funds */}
            <div className="accordion-item">
                <h2 className="accordion-header mt-3" id="headingFour">
                <button
                  className="accordion-button collapsed d-flex align-items-center justify-content-start gap-2 ps-1 border-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                 
                >
                  <i class="fa-solid fa-indian-rupee-sign text-primary fs-5"></i>
                  Funds
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Add money</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Withdraw money</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Add bank accounts</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>eMandates</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* console */}
            <div className="accordion-item">
                <h2 className="accordion-header mt-3" id="headingFive">
                <button
                  className="accordion-button collapsed d-flex align-items-center justify-content-start gap-2 ps-1 border-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                 
                >
                  <i class="fa-solid fa-circle-check text-primary fs-5"></i>
                  Console
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Portfolio</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Corporate actions</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Funds statement</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Reports</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Profile</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Segments</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* coin */}
            <div className="accordion-item">
               <h2 className="accordion-header mt-3" id="headingSix">
                <button
                  className="accordion-button collapsed d-flex align-items-center justify-content-start gap-2 ps-1 border-top"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                 
                >
                  <i class="fa-solid fa-circle-dollar-to-slot text-primary fs-5"></i>
                  Coin
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  <ul>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Mutual funds</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>National Pension Scheme (NPS)</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Fixed Deposit (FD)</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Features on Coin</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>Payments and Orders</a>
                    </li>
                    <li>
                      <a href="#" style={{lineHeight:"2.5"}}>General</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Notice and Quick Links */}
        <div className="col-md-4">
          <div className="alert alert-warning">
            Some of our clients are facing issues connecting with our support
            team over call due to an issue with our vendors.
            <br />
            Please create a ticket on our Support Portal for any queries in the
            meantime. We are working on having the issues resolved at the
            earliest. We regret the inconvenience caused.
          </div>

          <div className="card">
            <div className="card-body">
              <h6>Quick links</h6>
              <ul className="list-unstyled ">
                <li>
                  <a href="#" style={{lineHeight:"2.5"}}>1. Track account opening</a>
                </li>
                <li>
                  <a href="#" style={{lineHeight:"2.5"}}>2. Track segment activation</a>
                </li>
                <li>
                  <a href="#" style={{lineHeight:"2.5"}}>3. Intraday margins</a>
                </li>
                <li>
                  <a href="#" style={{lineHeight:"2.5"}}>4. Kite user manual</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
