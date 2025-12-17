import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
    fetchUserStats();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leaderboard`);
      setLeaderboard(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/leaderboard/stats`, {
        withCredentials: true,
      });
      setUserStats(response.data);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Are you sure you want to reset your account? This will delete all holdings, positions, and strategies.")) {
      try {
        await axios.post(`${API_BASE_URL}/api/leaderboard/reset`, {}, {
          withCredentials: true,
        });
        alert("Account reset successfully! You now have ₹10,00,000 in virtual cash.");
        fetchUserStats();
        window.location.reload();
      } catch (error) {
        console.error("Error resetting account:", error);
        alert("Error resetting account. Please try again.");
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Virtual Trading League</h3>

      {userStats && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4>Your Stats</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div>
              <p style={{ margin: "5px 0", color: "#666" }}>Virtual Cash</p>
              <h3 style={{ margin: "5px 0", color: "#2962ff" }}>{formatCurrency(userStats.virtualCash)}</h3>
            </div>
            <div>
              <p style={{ margin: "5px 0", color: "#666" }}>Total P&L</p>
              <h3
                style={{
                  margin: "5px 0",
                  color: userStats.totalPnL >= 0 ? "#4caf50" : "#f44336",
                }}
              >
                {formatCurrency(userStats.totalPnL)} ({formatPercentage((userStats.totalPnL / 1000000) * 100)})
              </h3>
            </div>
            <div>
              <p style={{ margin: "5px 0", color: "#666" }}>Weekly P&L</p>
              <h3
                style={{
                  margin: "5px 0",
                  color: userStats.weeklyPnL >= 0 ? "#4caf50" : "#f44336",
                }}
              >
                {formatCurrency(userStats.weeklyPnL)} ({formatPercentage((userStats.weeklyPnL / 1000000) * 100)})
              </h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#ff9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset Account
          </button>
        </div>
      )}

      <div>
        <h4>Top 10 Traders (This Week)</h4>
        {loading ? (
          <p>Loading leaderboard...</p>
        ) : leaderboard.length === 0 ? (
          <p>No traders yet. Be the first to start trading!</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Rank</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Username</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Weekly P&L</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Total P&L</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Virtual Cash</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((trader, index) => (
                <tr key={index}>
                  <td style={{ padding: "10px", border: "1px solid #ddd", fontWeight: index < 3 ? "bold" : "normal" }}>
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{trader.username}</td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      color: trader.weeklyPnL >= 0 ? "#4caf50" : "#f44336",
                    }}
                  >
                    {formatCurrency(trader.weeklyPnL)}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      color: trader.totalPnL >= 0 ? "#4caf50" : "#f44336",
                    }}
                  >
                    {formatCurrency(trader.totalPnL)}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{formatCurrency(trader.virtualCash)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;

