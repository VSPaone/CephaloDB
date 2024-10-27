module.exports = {
    NODE_ENV: 'production',
    PORT: 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'your-production-secret-key',  // Always set this securely in your environment variables
    DATABASE_URL: process.env.DATABASE_URL || 'http://production-db-url', // Replace with your production database URL
    LOGGING: false,
    AUTO_SYNC: false,
};
