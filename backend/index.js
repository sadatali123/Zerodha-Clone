const express =  require("express");
const app = express();

require("dotenv").config(); // helps to read .env file and added to process.env
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002; // it is used to set the port number
const uri = process.env.MONGO_URL ; // it is used to connect to mongoDB

app.listen(PORT,  () =>{
    console.log("Server running on port 3002");
     mongoose.connect(uri);
    console.log("MongoDB connected");
})




