const Strategy = require("../model/StrategyModel");
const User = require("../model/UsersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { OrdersModel } = require("../model/OrdersModel");

// Create a new trading strategy
module.exports.createStrategy = async (req, res) => {
  try {
    const { name, ticker, condition, triggerPrice, action, quantity } = req.body;
    const userId = req.userId; // From auth middleware

    const strategy = await Strategy.create({
      userId,
      name,
      ticker,
      condition,
      triggerPrice,
      action,
      quantity,
    });

    res.status(201).json({ message: "Strategy created successfully", strategy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating strategy", error: error.message });
  }
};

// Get all strategies for a user
module.exports.getStrategies = async (req, res) => {
  try {
    const userId = req.userId;
    const strategies = await Strategy.find({ userId }).sort({ createdAt: -1 });
    res.json(strategies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching strategies", error: error.message });
  }
};

// Update strategy
module.exports.updateStrategy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    const strategy = await Strategy.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true }
    );

    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }

    res.json({ message: "Strategy updated successfully", strategy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating strategy", error: error.message });
  }
};

// Delete strategy
module.exports.deleteStrategy = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const strategy = await Strategy.findOneAndDelete({ _id: id, userId });

    if (!strategy) {
      return res.status(404).json({ message: "Strategy not found" });
    }

    res.json({ message: "Strategy deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting strategy", error: error.message });
  }
};

// Execute a strategy (called by cron job)
module.exports.executeStrategy = async (strategy, currentPrice) => {
  try {
    let shouldExecute = false;

    if (strategy.condition === "below" && currentPrice <= strategy.triggerPrice) {
      shouldExecute = true;
    } else if (strategy.condition === "above" && currentPrice >= strategy.triggerPrice) {
      shouldExecute = true;
    } else if (strategy.condition === "equals" && currentPrice === strategy.triggerPrice) {
      shouldExecute = true;
    }

    if (shouldExecute && strategy.isActive) {
      const user = await User.findById(strategy.userId);
      const totalCost = currentPrice * strategy.quantity;

      if (strategy.action === "BUY") {
        if (user.virtualCash >= totalCost) {
          // Deduct cash
          user.virtualCash -= totalCost;
          await user.save();

          // Add to holdings
          const existingHolding = await HoldingsModel.findOne({
            userId: strategy.userId,
            name: strategy.ticker,
          });

          if (existingHolding) {
            const totalQty = existingHolding.qty + strategy.quantity;
            const newAvg = (existingHolding.avg * existingHolding.qty + totalCost) / totalQty;
            existingHolding.qty = totalQty;
            existingHolding.avg = newAvg;
            existingHolding.price = currentPrice;
            await existingHolding.save();
          } else {
            await HoldingsModel.create({
              userId: strategy.userId,
              name: strategy.ticker,
              qty: strategy.quantity,
              avg: currentPrice,
              price: currentPrice,
              net: "0.00%",
              day: "0.00%",
            });
          }

          // Create order record
          await OrdersModel.create({
            userId: strategy.userId,
            name: strategy.ticker,
            price: currentPrice,
            quantity: strategy.quantity,
            action: "BUY",
            type: "STRATEGY",
            strategyId: strategy._id,
          });

          // Deactivate strategy after execution
          strategy.isActive = false;
          await strategy.save();

          return { executed: true, message: "Buy order executed" };
        }
      } else if (strategy.action === "SELL") {
        const holding = await HoldingsModel.findOne({
          userId: strategy.userId,
          name: strategy.ticker,
        });

        if (holding && holding.qty >= strategy.quantity) {
          // Add cash
          user.virtualCash += totalCost;
          await user.save();

          // Update holdings
          holding.qty -= strategy.quantity;
          if (holding.qty === 0) {
            await HoldingsModel.deleteOne({ _id: holding._id });
          } else {
            await holding.save();
          }

          // Create order record
          await OrdersModel.create({
            userId: strategy.userId,
            name: strategy.ticker,
            price: currentPrice,
            quantity: strategy.quantity,
            action: "SELL",
            type: "STRATEGY",
            strategyId: strategy._id,
          });

          // Deactivate strategy after execution
          strategy.isActive = false;
          await strategy.save();

          return { executed: true, message: "Sell order executed" };
        }
      }
    }

    return { executed: false };
  } catch (error) {
    console.error("Error executing strategy:", error);
    return { executed: false, error: error.message };
  }
};

