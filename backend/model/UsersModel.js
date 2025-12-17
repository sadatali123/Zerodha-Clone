const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  virtualCash: {
    type: Number,
    default: 1000000, // ₹10,00,000 initial virtual cash
  },
  totalPnL: {
    type: Number,
    default: 0,
  },
  weeklyPnL: {
    type: Number,
    default: 0,
  },
  lastResetDate: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);