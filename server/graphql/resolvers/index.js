const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const getEvents = eventIds => {
    return Event.find({ _id: { $in: eventIds } })
        .then(events => {
            return events.map(event => {
                return { ...event._doc, _id: event.id, creator: getUser.bind(this, event.creator) };
            });
        })
        .catch(err => {
            throw err;
        });
};

const getUser = userId => {
    return User.findById(userId)
        .then(user => {
            return { ...user._doc, _id: user.id, createdEvents: getEvents.bind(this, user._doc.createdEvents) };
        })
        .catch(err => {
            throw err;
        });
};
//.then(delayPromise())
module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events
                .map(event => {
                    console.log('event._doc: ', event._doc);
                    return {
                        ...event._doc,
                        _id: event.id,
                        date: new Date(event.date).toDateString(),
                        creator: getUser.bind(this, event._doc.creator)
                    };
                })
                .reverse();
        } catch (err) {
            throw err;
        }
    },
    deleteEvent: async args => {
        console.log('deleteEvent args: ', args);
        const id = args.eventInput._id;
        try {
            const result = await Event.findByIdAndRemove(id);
            console.log('result: ', result);
            return result;
        } catch (err) {
            throw err;
        }
    },
    createEvent: args => {
        //console.log('args: ', args);

        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c6ea3aad09e2d3ae8807172'
        });
        let createdEvent;
        return event
            .save()

            .then(result => {
                createdEvent = {
                    ...result._doc,
                    _id: event.id,
                    date: new Date(event.date).toDateString(),
                    creator: getUser.bind(this, result._doc.creator)
                };
                return User.findById('5c6ea3aad09e2d3ae8807172');
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found');
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent;
            })
            .catch(err => {
                console.log('err: ', err);
                throw err;
            });
    },
    createUser: args => {
        return User.findOne({ email: args.userInput.email })
            .then(user => {
                if (user) {
                    throw new Error('User exists already');
                }
                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(result => {
                return { ...result._doc, password: null, _id: result.id };
            })
            .catch(err => {
                throw err;
            });
    }
};
