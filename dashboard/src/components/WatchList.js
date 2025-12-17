import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { watchlist } from "../data/Data";
import { DoughnutChart } from "./DoughnutChart";
import { WS_BASE_URL, API_BASE_URL } from "../config/api";

// prepare labels for chart
const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [stockPrices, setStockPrices] = useState({});
  const [sentiments, setSentiments] = useState({});

  useEffect(() => {
    // Initialize prices from watchlist
    const initialPrices = {};
    watchlist.forEach((stock) => {
      initialPrices[stock.name] = {
        price: stock.price,
        change: 0,
        isUp: !stock.isDown,
      };
    });
    setStockPrices(initialPrices);

    // Connect to WebSocket
    const socket = io(WS_BASE_URL, {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      // Subscribe to all tickers in watchlist
      watchlist.forEach((stock) => {
        socket.emit("subscribe", stock.name);
      });
    });

    socket.on("priceUpdate", (data) => {
      setStockPrices((prev) => ({
        ...prev,
        [data.ticker]: {
          price: data.price,
          change: parseFloat(data.change),
          isUp: data.isUp,
        },
      }));
    });

    socket.on("allPrices", (prices) => {
      setStockPrices((prev) => {
        const updated = { ...prev };
        Object.keys(prices).forEach((ticker) => {
          if (updated[ticker]) {
            updated[ticker] = {
              ...updated[ticker],
              ...prices[ticker],
              change: typeof prices[ticker]?.change === 'number' 
                ? prices[ticker].change 
                : parseFloat(prices[ticker]?.change || 0),
            };
          }
        });
        return updated;
      });
    });

    // Fetch sentiments for all stocks
    watchlist.forEach((stock) => {
      fetchSentiment(stock.name);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchSentiment = async (ticker) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/sentiment/${ticker}`);
      setSentiments((prev) => ({
        ...prev,
        [ticker]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching sentiment for ${ticker}:`, error);
    }
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "price",
        data: watchlist.map((stock) => stockPrices[stock.name]?.price || stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {watchlist.length}/50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => {
          const priceData = stockPrices[stock.name] || {
            price: stock.price,
            change: 0,
            isUp: !stock.isDown,
          };
          const sentiment = sentiments[stock.name];
          return (
            <WatchListItem
              stock={stock}
              priceData={priceData}
              sentiment={sentiment}
              key={index}
            />
          );
        })}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, priceData, sentiment }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    // Flash animation when price updates
    setFlashClass(priceData.isUp ? "flash-green" : "flash-red");
    const timer = setTimeout(() => setFlashClass(""), 500);
    return () => clearTimeout(timer);
  }, [priceData.price, priceData.isUp]);

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };
  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  const changePercent = priceData.change !== undefined && priceData.change !== null
    ? `${priceData.isUp ? "+" : ""}${Number(priceData.change).toFixed(2)}%`
    : stock.percent;

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <p className={priceData.isUp ? "up" : "down"}>{stock.name}</p>
          {sentiment && (
            <span
              style={{
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: "bold",
                backgroundColor:
                  sentiment.color === "green"
                    ? "#4caf50"
                    : sentiment.color === "red"
                    ? "#f44336"
                    : "#9e9e9e",
                color: "white",
              }}
            >
              {sentiment.label}
            </span>
          )}
        </div>
        <div className={`itemInfo ${flashClass}`}>
          <span className="percent">{changePercent}</span>
          {priceData.isUp ? (
            <KeyboardArrowUp className="up" />
          ) : (
            <KeyboardArrowDown className="down" />
          )}
          <span className="price">{priceData.price.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && <WatchlistActions uid={stock.name} />}
    </li>
  );
};

const WatchlistActions = ({ uid }) => {
  return (
    <span className="actions ">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy">Buy</button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell">Sell</button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="More"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
