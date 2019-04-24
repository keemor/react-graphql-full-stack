const Booking = require('../../models/booking');
const Event = require('../../models/event');

const { transformEvent, transformBooking } = require('./merge');

//.then(delayPromise())
module.exports = {
    bookings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const bookings = await Booking.find({ user: req.userId });

            return bookings.map(booking => transformBooking(booking));
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const fetchedEvent = await Event.findById(args.eventId);
            if (!fetchedEvent) {
                throw new Error('Event does not exists');
            }
            const booking = new Booking({
                user: req.userId,
                event: fetchedEvent
            });

            const result = await booking.save();

            return transformBooking(result);
        } catch (err) {
            throw err;
        }
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            await Booking.deleteOne({ _id: args.bookingId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};
