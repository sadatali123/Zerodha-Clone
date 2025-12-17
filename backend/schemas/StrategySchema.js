const { Schema } = require("mongoose");

const StrategySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    enum: ["below", "above", "equals"],
    required: true,
  },
  triggerPrice: {
    type: Number,
    required: true,
  },
  action: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = { StrategySchema };

