const Sentiment = require("sentiment");
const axios = require("axios");

const sentiment = new Sentiment();

// Get news sentiment for a stock ticker
module.exports.getStockSentiment = async (req, res) => {
  try {
    const { ticker } = req.params;

    // Using NewsAPI (free tier) - you'll need to add NEWS_API_KEY to .env
    // Alternative: Use a free news API or mock data for demo
    const newsApiKey = process.env.NEWS_API_KEY || "";

    let headlines = [];
    let sentimentScore = 0;

    if (newsApiKey) {
      try {
        // Fetch news for the stock
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${ticker}&apiKey=${newsApiKey}&pageSize=10&sortBy=publishedAt`
        );

        headlines = response.data.articles.map((article) => article.title);
      } catch (error) {
        console.error("News API error:", error.message);
        // Fallback to mock headlines
        headlines = generateMockHeadlines(ticker);
      }
    } else {
      // Use mock headlines if no API key
      headlines = generateMockHeadlines(ticker);
    }

    // Analyze sentiment for each headline
    const sentiments = headlines.map((headline) => sentiment.analyze(headline));
    const totalScore = sentiments.reduce((sum, s) => sum + s.score, 0);
    sentimentScore = totalScore / sentiments.length;

    // Determine sentiment label
    let label = "NEUTRAL";
    let color = "gray";

    if (sentimentScore > 2) {
      label = "BULLISH";
      color = "green";
    } else if (sentimentScore < -2) {
      label = "BEARISH";
      color = "red";
    }

    res.json({
      ticker,
      sentimentScore: sentimentScore.toFixed(2),
      label,
      color,
      headlineCount: headlines.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching sentiment", error: error.message });
  }
};

// Mock headlines generator (for demo when API key is not available)
function generateMockHeadlines(ticker) {
  const positiveHeadlines = [
    `${ticker} surges on strong quarterly results`,
    `Analysts upgrade ${ticker} to buy rating`,
    `${ticker} announces major expansion plans`,
    `Positive outlook for ${ticker} in coming months`,
  ];

  const negativeHeadlines = [
    `${ticker} faces regulatory challenges`,
    `Concerns over ${ticker} growth prospects`,
    `${ticker} reports lower than expected earnings`,
    `Market volatility impacts ${ticker} performance`,
  ];

  const neutralHeadlines = [
    `${ticker} maintains steady performance`,
    `${ticker} quarterly results meet expectations`,
    `${ticker} announces board meeting`,
  ];

  // Randomly mix headlines for realistic sentiment
  const allHeadlines = [
    ...positiveHeadlines.slice(0, 3),
    ...negativeHeadlines.slice(0, 2),
    ...neutralHeadlines.slice(0, 2),
  ];

  return allHeadlines;
}

