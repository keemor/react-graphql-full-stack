const Booking = require('../../models/booking');
const Event = require('../../models/booking');

const { transformEvent, transformBooking } = require('./merge');

//.then(delayPromise())
module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();

            return bookings.map(booking => transformBooking(booking));
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const fetchedEvent = await Event.findOne({ _id: args.eventId });

        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        });

        const result = await booking.save();

        return transformBooking(result);
    },
    cancelBooking: async args => {
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
