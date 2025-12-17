const router = require("express").Router();
const { getStockSentiment } = require("../controllers/SentimentController");

router.get("/:ticker", getStockSentiment);

module.exports = router;

