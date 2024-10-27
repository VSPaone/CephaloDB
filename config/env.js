const environment = process.env.NODE_ENV || 'development';

let envConfig;

if (environment === 'production') {
    envConfig = require('./env.production');
} else {
    envConfig = require('./env.development');
}

module.exports = envConfig;
