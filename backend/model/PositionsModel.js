const {PositionsSchema} = require("../schemas/PositionsSchema");
const {model} = require("mongoose");

const PositionsModel = model("positions", PositionsSchema); // "positions" is the collection name in MongoDB and PositionsSchema is the schema defined for that collection
module.exports = {PositionsModel}; // it is used to export the PositionsModel so that it can be used for CRUD operations on the "positions" collection in MongoDB
