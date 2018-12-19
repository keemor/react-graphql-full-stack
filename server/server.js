const express = require('express');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');
const compression = require('compression');

const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const app = express();
//Disable http on heroku
if (env === 'production') {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(compression());
app.use(bodyParser.json());
app.use('/', express.static(`${__dirname}/../dist`));

app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find().then(events => {
                return events.map(event => {
                    return { ...event._doc, _id: event.id, date: new Date(event.date).toDateString() };
                }).reverse();
            }).catch(err => {
                throw err;
            });
        },
        createEvent: (args) => {
            console.log('args: ', args);

            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date)
            });
            return event
                .save()
                .then(result => {
                    console.log('result: ', result);
                    return { ...result._doc, _id: event.id, date: new Date(event.date).toDateString() };

                }).catch(err => {
                    console.log('err: ', err);
                    throw err;
                });

        },
    },
    graphiql: (env === 'development')
}));

const mongodb = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/EventsApp';

//mongoose.Promise = global.Promise;
mongoose.connect(
    mongodb,
    { useNewUrlParser: true }
).then(() => {
    app.listen(port);
    console.info('Server running on port', port);
}).catch(err => {
    console.log('err: ', err);
});


