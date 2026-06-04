// Vercel Speed Insights initialization
// https://vercel.com/docs/speed-insights

import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights with configuration
injectSpeedInsights({
  debug: false, // Set to true to enable debug logging in development
  sampleRate: 1, // Send 100% of events (adjust to reduce data if needed)
});
