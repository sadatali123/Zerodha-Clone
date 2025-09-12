import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center" style={{ padding: "100px 0" }}>
        <h3 className="text-center">The Zerodha Universe</h3>
        <p className="mt-3 fw-semibold text-muted">
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>

      <div className="row d-flex justify-content-evenly text-muted">
        <div className="col-3 team-container text-center">
          <img
            src="media\images\zerodhaFundhouse.png"
            alt="zerodha fund house"
            style={{ width: "60%" }}
          />
          <p className="mt-4">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>

        <div className="col-3 team-container text-center">
          <img
            src="media\images\sensibullLogo.svg"
            alt="sensibull-Logo"
            style={{ width: "60%" }}
          />
          <p className="mt-5">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>

        <div className="col-3 team-container text-center">
          <img
            src="media\images\tijori.svg"
            alt="zerodha fund house"
            style={{ width: "60%" }}
          />
          <p className="mt-3">
            Investment research platform that offers detailed insights on
            stocks, sectors, supply chains, and more.
          </p>
        </div>
      </div>

      <div className="row mt-5 d-flex justify-content-evenly text-muted">
        <div className="col-3 team-container text-center">
          <img
            src="media\images\streakLogo.png"
            alt="zerodha fund house"
            style={{ width: "60%" }}
          />
          <p className="mt-2">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>

        <div className="col-3 team-container text-center">
          <img
            src="media\images\smallcaseLogo.png"
            alt="smallcase-Logo"
            style={{ width: "60%" }}
          />
          <p className="mt-3">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs. more.
          </p>
        </div>

        <div className="col-3 team-container text-center">
          <img
            src="media\images\dittoLogo.png"
            alt="zerodha fund house"
            style={{ width: "50%" }}
          />
          <p className="mt-3">
            Personalized advice on life and health insurance. No spam and no
            mis-selling.
          </p>
        </div>
      </div>
      <button type="button" className="btn btn-primary button mt-5">Sign up for free</button>
    </div>
  );
}

export default Universe;
