const User = require("../model/UsersModel");

// Get leaderboard (top 10 users by weekly P&L)
module.exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .select("username weeklyPnL totalPnL virtualCash")
      .sort({ weeklyPnL: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching leaderboard", error: error.message });
  }
};

// Get user stats
module.exports.getUserStats = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("username virtualCash totalPnL weeklyPnL");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user stats", error: error.message });
  }
};

// Reset user account
module.exports.resetAccount = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset virtual cash and P&L
    user.virtualCash = 1000000;
    user.totalPnL = 0;
    user.weeklyPnL = 0;
    user.lastResetDate = new Date();
    await user.save();

    // Delete all holdings and positions
    const { HoldingsModel } = require("../model/HoldingsModel");
    const { PositionsModel } = require("../model/PositionsModel");
    const Strategy = require("../model/StrategyModel");

    await HoldingsModel.deleteMany({ userId });
    await PositionsModel.deleteMany({ userId });
    await Strategy.deleteMany({ userId });

    res.json({ message: "Account reset successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting account", error: error.message });
  }
};

