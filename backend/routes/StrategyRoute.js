const router = require("express").Router();
const {
  createStrategy,
  getStrategies,
  updateStrategy,
  deleteStrategy,
} = require("../controllers/StrategyController");
const { authenticateToken } = require("../middlewares/AuthMiddleware");

router.post("/create", authenticateToken, createStrategy);
router.get("/", authenticateToken, getStrategies);
router.put("/:id", authenticateToken, updateStrategy);
router.delete("/:id", authenticateToken, deleteStrategy);

module.exports = router;

