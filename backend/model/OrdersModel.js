const {OrdersSchema} = require("../schemas/OrdersSchema");
const {model} = require("mongoose");

const OrdersModel = model("orders", OrdersSchema);

module.exports = {OrdersModel};     