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
    createEvent: async args => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c6ea3aad09e2d3ae8807172'
        });
        let createdEvent;

        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const user = await User.findById('5c6ea3aad09e2d3ae8807172');

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
    deleteEvent: async args => {
        try {
            const event = await Event.findById(args.eventId);
            if (!event) {
                throw new Error('Event does not exists');
            }
            await Event.deleteOne({ _id: args.eventId });
            return event;
        } catch (err) {
            throw err;
        }
    }
};
