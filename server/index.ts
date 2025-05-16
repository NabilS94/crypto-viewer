import dotenv from 'dotenv';
// Load environment variables first
dotenv.config();

import cors from 'cors';
import express from 'express';
import { errorHandler } from './middleware/error.middleware';
import { apiLimiter } from './middleware/rate-limit.middleware';
import assetRoutes from './routes/asset.routes';
import exchangeRoutes from './routes/exchange.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

// Routes
app.use('/api/assets', assetRoutes);
app.use('/api/exchanges', exchangeRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Crypto Viewer API' });
});

// Error handling
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export for Vercel
export default app;
