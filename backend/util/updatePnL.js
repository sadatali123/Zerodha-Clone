const User = require("../model/UsersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { getCurrentPrice } = require("../services/PriceService");

// Calculate and update user P&L
async function updateUserPnL(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    const holdings = await HoldingsModel.find({ userId });

    let totalInvestment = 0;
    let totalCurrentValue = 0;

    for (const holding of holdings) {
      const currentPrice = getCurrentPrice(holding.name);
      const investment = holding.avg * holding.qty;
      const currentValue = currentPrice * holding.qty;

      totalInvestment += investment;
      totalCurrentValue += currentValue;

      // Update holding price
      holding.price = currentPrice;
      const netChange = ((currentPrice - holding.avg) / holding.avg) * 100;
      holding.net = `${netChange >= 0 ? "+" : ""}${netChange.toFixed(2)}%`;
      await holding.save();
    }

    // Calculate P&L
    const totalPnL = totalCurrentValue + user.virtualCash - 1000000; // Initial cash was 10,00,000
    const weeklyPnL = totalPnL; // For now, weekly = total (can be improved with date tracking)

    user.totalPnL = totalPnL;
    user.weeklyPnL = weeklyPnL;
    await user.save();

    return { totalPnL, weeklyPnL };
  } catch (error) {
    console.error(`Error updating P&L for user ${userId}:`, error);
    return null;
  }
}

// Update P&L for all users
async function updateAllUsersPnL() {
  try {
    const User = require("../model/UsersModel");
    const users = await User.find({});

    for (const user of users) {
      await updateUserPnL(user._id);
    }
  } catch (error) {
    console.error("Error updating all users P&L:", error);
  }
}

module.exports = { updateUserPnL, updateAllUsersPnL };

