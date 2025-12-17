const router = require("express").Router();
const {
  getLeaderboard,
  getUserStats,
  resetAccount,
} = require("../controllers/LeaderboardController");
const { authenticateToken } = require("../middlewares/AuthMiddleware");

router.get("/", getLeaderboard);
router.get("/stats", authenticateToken, getUserStats);
router.post("/reset", authenticateToken, resetAccount);

module.exports = router;

