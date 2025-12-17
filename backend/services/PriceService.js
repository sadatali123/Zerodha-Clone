// Simulated price service for demo purposes
// In production, this would connect to a real stock market API

const stockPrices = {
  INFY: 1555.45,
  ONGC: 116.8,
  TCS: 3194.8,
  KPITTECH: 266.45,
  QUICKHEAL: 308.55,
  WIPRO: 577.75,
  "M&M": 779.8,
  RELIANCE: 2112.4,
  HUL: 512.4,
  BHARTIARTL: 541.15,
  HDFCBANK: 1522.35,
  HINDUNILVR: 2417.4,
  ITC: 207.9,
  SBIN: 430.2,
  TATAPOWER: 124.15,
  TATAMOTORS: 900,
};

// Get current price for a ticker
function getCurrentPrice(ticker) {
  return stockPrices[ticker] || 100;
}

// Simulate price change (random walk)
function updatePrice(ticker) {
  if (!stockPrices[ticker]) {
    stockPrices[ticker] = 100;
  }

  // Random price change between -2% and +2%
  const changePercent = (Math.random() - 0.5) * 4;
  const currentPrice = stockPrices[ticker];
  const newPrice = currentPrice * (1 + changePercent / 100);

  // Round to 2 decimal places
  stockPrices[ticker] = Math.round(newPrice * 100) / 100;

  return stockPrices[ticker];
}

// Get all prices
function getAllPrices() {
  return { ...stockPrices };
}

module.exports = {
  getCurrentPrice,
  updatePrice,
  getAllPrices,
};

