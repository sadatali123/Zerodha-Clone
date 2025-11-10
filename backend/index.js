const express = require("express");
const app = express();
const dotenv = require("dotenv").config(); // helps to read .env file and added to process.env
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002; // it is used to set the port number
const uri = process.env.MONGO_URL; // it is used to connect to mongoDB
const { HoldingsModel } = require("./model/HoldingsModel");
const {PositionsModel} = require("./model/PositionsModel");

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // to parse cookies from browser


app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());  // to parse JSON data in request body
app.use(cookieParser());

// Apply routes after all middleware
const authRoute = require("./routes/AuthRoute");
app.use("/", authRoute);

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

app.get("/get-holdings", async (req, res) => {
  let holdingsData = await HoldingsModel.find({});
  res.send(holdingsData);
});

// get positions data from MongoDB
app.get("/get-positions", async (req, res) => {
  let positionsData = await PositionsModel.find({});
  res.send(positionsData);
});

app.listen(PORT, () => {
  console.log("Server running on port 3002");
  mongoose.connect(uri);
  console.log("MongoDB connected");
});


app.use(express.json());
