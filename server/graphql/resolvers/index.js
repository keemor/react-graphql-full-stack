const auth = require('./auth');
const events = require('./events');
const bookings = require('./bookings');

const rootResolver = {
    ...auth,
    ...events,
    ...bookings
};
module.exports = rootResolver;
