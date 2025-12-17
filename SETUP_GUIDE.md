# Setup Guide for New Features

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

This will install the new dependencies:
- `socket.io` - For WebSocket real-time communication
- `node-cron` - For scheduled tasks (strategy execution)
- `sentiment` - For news sentiment analysis
- `axios` - For HTTP requests (if not already installed)

### 2. Install Frontend Dependencies
```bash
cd dashboard
npm install
```

This will install:
- `socket.io-client` - WebSocket client
- `lightweight-charts` - TradingView charts library

### 3. Environment Variables

Create or update `backend/.env`:
```env
PORT=3002
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TOKEN_KEY=your_jwt_secret_key
NEWS_API_KEY=your_news_api_key_here  # Optional - for real news sentiment
```

**Note**: `NEWS_API_KEY` is optional. If not provided, the system will use mock sentiment data.

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd dashboard
npm start
```

The dashboard will typically run on `http://localhost:3000` and the backend on `http://localhost:3002`.

## Testing the Features

### 1. Real-Time Price Updates
1. Open the dashboard
2. Navigate to the watchlist (left sidebar)
3. Watch prices update in real-time (every 2 seconds)
4. Notice the green/red flash when prices change

### 2. Strategy Builder
1. Click "Strategies" in the menu
2. Click "+ Create Strategy"
3. Fill in the form:
   - Name: "Buy TATA on Dip"
   - Ticker: "TATAMOTORS"
   - Condition: "Price drops below"
   - Trigger Price: 900
   - Action: "BUY"
   - Quantity: 10
4. Click "Create Strategy"
5. The strategy will execute automatically when the condition is met (checked every minute)

### 3. Leaderboard
1. Click "Leaderboard" in the menu
2. View your stats (Virtual Cash, Total P&L, Weekly P&L)
3. See the top 10 traders ranked by weekly P&L
4. Use "Reset Account" to start fresh with ₹10,00,000

### 4. Sentiment Badges
1. Check the watchlist
2. Look for colored badges next to stock names:
   - 🟢 Green "BULLISH" - Positive sentiment
   - 🔴 Red "BEARISH" - Negative sentiment
   - ⚪ Gray "NEUTRAL" - Neutral sentiment

### 5. TradingView Charts
The chart component is ready to use. You can integrate it into any page:
```jsx
import TradingViewChart from "./components/TradingViewChart";

<TradingViewChart ticker="RELIANCE" data={candlestickData} />
```

## Troubleshooting

### WebSocket Connection Issues
- Ensure the backend is running before starting the frontend
- Check that CORS origins include your frontend URL
- Verify the WebSocket URL in `dashboard/src/config/api.js`

### Strategy Not Executing
- Check that the strategy is marked as "Active"
- Verify the trigger price condition matches current market price
- Ensure the user has sufficient virtual cash (for BUY) or holdings (for SELL)
- Check backend console for error messages

### Sentiment Not Showing
- If using mock data, sentiment will still work but with simulated headlines
- For real news, ensure `NEWS_API_KEY` is set in `.env`
- Check browser console for API errors

### P&L Not Updating
- P&L is recalculated every 5 minutes via cron job
- You can manually trigger by calling the update function
- Ensure holdings have valid prices

## API Endpoints

### Strategies
- `POST /api/strategies/create` - Create strategy (requires auth)
- `GET /api/strategies` - Get user strategies (requires auth)
- `PUT /api/strategies/:id` - Update strategy (requires auth)
- `DELETE /api/strategies/:id` - Delete strategy (requires auth)

### Leaderboard
- `GET /api/leaderboard` - Get top 10 traders (public)
- `GET /api/leaderboard/stats` - Get user stats (requires auth)
- `POST /api/leaderboard/reset` - Reset account (requires auth)

### Sentiment
- `GET /api/sentiment/:ticker` - Get stock sentiment (public)

## Notes

- All prices are simulated for demo purposes
- Strategies execute every minute (configurable in `backend/index.js`)
- P&L updates every 5 minutes (configurable)
- Price updates broadcast every 2 seconds
- Initial virtual cash: ₹10,00,000 per user

