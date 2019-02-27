const Event = require('../../models/event');
const User = require('../../models/user');

const getEvents = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });

        return events.map(event => transformEvent(event));
    } catch (err) {
        throw err;
    }
};

const getEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
};

const getUser = async userId => {
    try {
        const user = await User.findById(userId);
        return { ...user._doc, _id: user.id, createdEvents: getEvents.bind(this, user._doc.createdEvents) };
    } catch (err) {
        throw err;
    }
};
exports.getEvents = getEvents;
exports.getEvent = getEvent;
exports.getUser = getUser;
