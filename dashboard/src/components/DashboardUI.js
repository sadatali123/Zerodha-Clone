import React from "react";
import { Routes, Route } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import StrategyBuilder from "./StrategyBuilder";
import Leaderboard from "./Leaderboard";

// import { GeneralContextProvider } from "../context/GeneralContext";

const DashboardUI = () => {
  return (
    <div className="dashboard-container">
      {/* <GeneralContextProvider> */}
        <WatchList />
      {/* </GeneralContextProvider> */}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/strategies" element={<StrategyBuilder />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardUI;