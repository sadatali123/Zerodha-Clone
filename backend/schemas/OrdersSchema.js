const {Schema} = require ("mongoose");

const OrdersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: String,
    price: Number,
    quantity: Number,
    action: {
        type: String,
        enum: ["BUY", "SELL"],
    },
    type: {
        type: String,
        enum: ["MANUAL", "STRATEGY"],
        default: "MANUAL",
    },
    strategyId: {
        type: Schema.Types.ObjectId,
        ref: "Strategy",
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});
module.exports = {OrdersSchema};
