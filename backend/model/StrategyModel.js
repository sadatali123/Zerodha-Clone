const mongoose = require("mongoose");
const { StrategySchema } = require("../schemas/StrategySchema");

module.exports = mongoose.model("Strategy", StrategySchema);

