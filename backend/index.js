const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const dotenv = require("dotenv").config(); // helps to read .env file and added to process.env
const mongoose = require("mongoose");
const cron = require("node-cron");
const PORT = process.env.PORT || 3002; // it is used to set the port number
const uri = process.env.MONGO_URL; // it is used to connect to mongoDB
const { HoldingsModel } = require("./model/HoldingsModel");
const {PositionsModel} = require("./model/PositionsModel");

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // to parse cookies from browser

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: ["https://zerodha-clone-client.vercel.app", "https://zerodha-clone-dashboard-ebon.vercel.app", "http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: ["https://zerodha-clone-client.vercel.app", "https://zerodha-clone-dashboard-ebon.vercel.app", "http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());  // to parse JSON data in request body
app.use(cookieParser());
app.use(express.json());

// Apply routes after all middleware
const authRoute = require("./routes/AuthRoute");
const strategyRoute = require("./routes/StrategyRoute");
const leaderboardRoute = require("./routes/LeaderboardRoute");
const sentimentRoute = require("./routes/SentimentRoute");

app.use("/", authRoute);
app.use("/api/strategies", strategyRoute);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/sentiment", sentimentRoute);

// app.post("/add-holdings", async (req, res) => {
  //   let tempholdingsData = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];
//   // temporary holdings data to be added to MongoDB
//   tempholdingsData.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });
//     newHolding.save(); // saves to MongoDB
//   });
//   res.send("Holdings data added");
// });


// app.post("/add-positions", async (req, res) => {
//   let tempPositionsData = [
//   {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: true,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];

// // here comparision occurs between schema and actual data sends by user and checks all fields are present or not
// tempPositionsData.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//     });
//     newPosition.save(); // saves to MongoDB
//   });
//   res.send("Positions data added");
// });



// get holdings data from MongoDB
const { authenticateToken } = require("./middlewares/AuthMiddleware");

app.get("/get-holdings", authenticateToken, async (req, res) => {
  try {
    let holdingsData = await HoldingsModel.find({ userId: req.userId });
    res.send(holdingsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

// get positions data from MongoDB
app.get("/get-positions", authenticateToken, async (req, res) => {
  try {
    let positionsData = await PositionsModel.find({ userId: req.userId });
    res.send(positionsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching positions" });
  }
});

// Price service for real-time updates
const { updatePrice, getAllPrices } = require("./services/PriceService");

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Subscribe to price updates for a ticker
  socket.on("subscribe", (ticker) => {
    socket.join(`ticker:${ticker}`);
    console.log(`Client ${socket.id} subscribed to ${ticker}`);
  });

  // Unsubscribe from price updates
  socket.on("unsubscribe", (ticker) => {
    socket.leave(`ticker:${ticker}`);
    console.log(`Client ${socket.id} unsubscribed from ${ticker}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Broadcast price updates every 2 seconds
setInterval(() => {
  const prices = getAllPrices();
  const updatedPrices = {};

  Object.keys(prices).forEach((ticker) => {
    const oldPrice = prices[ticker];
    const newPrice = updatePrice(ticker);
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    
    updatedPrices[ticker] = {
      price: newPrice,
      change: change.toFixed(2),
      isUp: change >= 0,
    };

    // Emit to all clients subscribed to this ticker
    io.to(`ticker:${ticker}`).emit("priceUpdate", {
      ticker,
      price: newPrice,
      change: change.toFixed(2),
      isUp: change >= 0,
    });
  });

  // Broadcast all prices to all connected clients
  io.emit("allPrices", updatedPrices);
}, 2000);

// Cron job to check and execute strategies every minute
cron.schedule("* * * * *", async () => {
  try {
    const Strategy = require("./model/StrategyModel");
    const { executeStrategy } = require("./controllers/StrategyController");
    const { getCurrentPrice } = require("./services/PriceService");

    const activeStrategies = await Strategy.find({ isActive: true });

    for (const strategy of activeStrategies) {
      const currentPrice = getCurrentPrice(strategy.ticker);
      await executeStrategy(strategy, currentPrice);
    }
  } catch (error) {
    console.error("Error in strategy execution cron job:", error);
  }
});

// Cron job to update P&L every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  try {
    const { updateAllUsersPnL } = require("./util/updatePnL");
    await updateAllUsersPnL();
    console.log("P&L updated for all users");
  } catch (error) {
    console.error("Error updating P&L:", error);
  }
});

// Make io available to other modules
app.set("io", io);

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
  mongoose.connect(uri);
  console.log("MongoDB connected");
});
