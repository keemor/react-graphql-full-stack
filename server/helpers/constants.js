const constants = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://mongo:27017/EventsApp',
    JWT_SECRET: process.env.JWT_SECRET || 'somesupersecretkey'
};

module.exports = Object.freeze(constants);
