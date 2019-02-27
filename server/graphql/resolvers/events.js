const Event = require('../../models/event');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');
const { getUser } = require('./merge');
const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: getUser.bind(this, event._doc.creator)
    };
};

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
