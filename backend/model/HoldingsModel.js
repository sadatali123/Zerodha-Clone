const {model} = require("mongoose");
const {HoldingsSchema} = require("../schemas/HoldingsSchema");

const HoldingsModel = model("holdings", HoldingsSchema);
module.exports = {HoldingsModel}; // it is used to export the HoldingsModel so that it can be used for CRUD operations on the "holdings" collection in MongoDB
