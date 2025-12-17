import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const StrategyBuilder = () => {
  const [strategies, setStrategies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    condition: "below",
    triggerPrice: "",
    action: "BUY",
    quantity: "",
  });

  useEffect(() => {
    fetchStrategies();
  }, []);

  const fetchStrategies = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/strategies`, {
        withCredentials: true,
      });
      setStrategies(response.data);
    } catch (error) {
      console.error("Error fetching strategies:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/api/strategies/create`,
        formData,
        { withCredentials: true }
      );
      setShowForm(false);
      setFormData({
        name: "",
        ticker: "",
        condition: "below",
        triggerPrice: "",
        action: "BUY",
        quantity: "",
      });
      fetchStrategies();
    } catch (error) {
      console.error("Error creating strategy:", error);
      alert("Error creating strategy. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this strategy?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/strategies/${id}`, {
          withCredentials: true,
        });
        fetchStrategies();
      } catch (error) {
        console.error("Error deleting strategy:", error);
      }
    }
  };

  const toggleStrategy = async (id, isActive) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/strategies/${id}`,
        { isActive: !isActive },
        { withCredentials: true }
      );
      fetchStrategies();
    } catch (error) {
      console.error("Error updating strategy:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h3>Algorithmic Trading Strategies</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2962ff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Cancel" : "+ Create Strategy"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4>Create New Strategy</h4>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Strategy Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Stock Ticker:</label>
              <input
                type="text"
                value={formData.ticker}
                onChange={(e) => setFormData({ ...formData, ticker: e.target.value.toUpperCase() })}
                required
                placeholder="e.g., RELIANCE, INFY"
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Condition:</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              >
                <option value="below">Price drops below</option>
                <option value="above">Price rises above</option>
                <option value="equals">Price equals</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Trigger Price (₹):</label>
              <input
                type="number"
                step="0.01"
                value={formData.triggerPrice}
                onChange={(e) => setFormData({ ...formData, triggerPrice: e.target.value })}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Action:</label>
              <select
                value={formData.action}
                onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              >
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Quantity:</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#2962ff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Create Strategy
            </button>
          </form>
        </div>
      )}

      <div>
        <h4>Your Strategies ({strategies.length})</h4>
        {strategies.length === 0 ? (
          <p>No strategies created yet. Create your first strategy above!</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Ticker</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Condition</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Trigger Price</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Action</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Quantity</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Status</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => (
                <tr key={strategy._id}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{strategy.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{strategy.ticker}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {strategy.condition === "below" && "Price drops below"}
                    {strategy.condition === "above" && "Price rises above"}
                    {strategy.condition === "equals" && "Price equals"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>₹{strategy.triggerPrice}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{strategy.action}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{strategy.quantity}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: strategy.isActive ? "#4caf50" : "#9e9e9e",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {strategy.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <button
                      onClick={() => toggleStrategy(strategy._id, strategy.isActive)}
                      style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        backgroundColor: strategy.isActive ? "#ff9800" : "#4caf50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      {strategy.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleDelete(strategy._id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StrategyBuilder;

