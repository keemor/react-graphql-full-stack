const Booking = require('../../models/booking');
const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => transformEvent(event)).reverse();
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        });
        let createdEvent;

        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const user = await User.findById(req.userId);

            if (!user) {
                throw new Error('User not found');
            }
            user.createdEvents.push(event);

            await user.save();

            return createdEvent;
        } catch (err) {
            throw err;
        }
    },
    deleteEvent: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const event = await Event.findOne({ _id: args.eventId, creator: req.userId });
            if (!event) {
                throw new Error('Event does not exists');
            }

            //Delete all bookings releated to the event
            await Booking.deleteMany({ event: args.eventId });

            //Remove event from the createdEvents list
            await User.findOneAndUpdate(
                req.userId,
                { $pull: { createdEvents: args.eventId } },
                { safe: true, upsert: true }
            );

            //Remove event
            await Event.deleteOne({ _id: args.eventId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};
