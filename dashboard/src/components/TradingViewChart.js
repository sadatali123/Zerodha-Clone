import React, { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

const TradingViewChart = ({ ticker, data }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const candlestickSeriesRef = useRef();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        textColor: "black",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#4caf50",
      downColor: "#f44336",
      borderVisible: false,
      wickUpColor: "#4caf50",
      wickDownColor: "#f44336",
    });

    candlestickSeriesRef.current = candlestickSeries;

    // Set data
    if (data && data.length > 0) {
      candlestickSeries.setData(data);
    } else {
      // Generate sample data if no data provided
      const sampleData = generateSampleData();
      candlestickSeries.setData(sampleData);
    }

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [ticker]);

  // Update data when it changes
  useEffect(() => {
    if (candlestickSeriesRef.current && data && data.length > 0) {
      candlestickSeriesRef.current.setData(data);
    }
  }, [data]);

  // Generate sample candlestick data
  const generateSampleData = () => {
    const data = [];
    const now = new Date();
    let basePrice = 1000;

    for (let i = 30; i >= 0; i--) {
      const time = new Date(now);
      time.setDate(time.getDate() - i);
      const timeStr = time.toISOString().split("T")[0];

      const open = basePrice;
      const volatility = basePrice * 0.02;
      const change = (Math.random() - 0.5) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * volatility * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * 0.5;

      data.push({
        time: timeStr,
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
      });

      basePrice = close;
    }

    return data;
  };

  return (
    <div style={{ width: "100%", marginTop: "20px" }}>
      <h4 style={{ marginBottom: "10px" }}>{ticker} - Price Chart</h4>
      <div ref={chartContainerRef} style={{ width: "100%" }} />
    </div>
  );
};

export default TradingViewChart;

