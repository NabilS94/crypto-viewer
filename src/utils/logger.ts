export const logger = {
  logError: (error: Error, context?: Record<string, unknown>) => {
    const timestamp = new Date().toISOString();
    const errorDetails = {
      timestamp,
      message: error.message,
      stack: error.stack,
      context,
    };

    // Log to console (for development)
    console.error("Error:", { error, errorDetails });
  },
};
