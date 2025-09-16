import React from 'react';


function Hero(){
    return(
      <div className="container mt-5">

      <div className=" row mb-4">
        <h2 className="mb-4" style={{marginLeft:"114px"}}>Support Portal</h2>
        <div className='col-1'></div>
        <div className="col-10">
            
        <input
          type="text"
          className="form-control"
          placeholder="Eg: How do I open my account, How do I activate F&O..."
        />

        </div>
      </div>

      <div className="row mt-5">
        {/* Left Side Accordion */}
        <div className='col-1'></div>
        <div className="col-6">
          <div className="accordion" id="supportAccordion">
            {/* Account Opening */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
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
                    <li><a href="#">Resident individual</a></li>
                    <li><a href="#">Minor</a></li>
                    <li><a href="#">Non Resident Indian (NRI)</a></li>
                    <li><a href="#">Company, Partnership, HUF and LLP</a></li>
                    <li><a href="#">Glossary</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Zerodha Account */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  Your Zerodha Account
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  Content for Zerodha Account...
                </div>
              </div>
            </div>

            {/* Kite */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  Kite
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#supportAccordion"
              >
                <div className="accordion-body">
                  Content for Kite...
                </div>
              </div>
            </div>

            {/* Add more sections (Funds, Console, Coin) as needed */}
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
              <ul className="list-unstyled">
                <li><a href="#">1. Track account opening</a></li>
                <li><a href="#">2. Track segment activation</a></li>
                <li><a href="#">3. Intraday margins</a></li>
                <li><a href="#">4. Kite user manual</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Hero;