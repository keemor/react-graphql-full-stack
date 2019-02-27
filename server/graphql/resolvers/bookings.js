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
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({ _id: args.eventId });

        const booking = new Booking({
            user: '5c6ea3aad09e2d3ae8807172',
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
    },
    deleteEvent: async args => {
        console.log('deleteEvent args: ', args);
        const id = args.eventInput._id;
        try {
            const result = await Event.findByIdAndRemove(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
};
