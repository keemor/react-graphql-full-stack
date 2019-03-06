const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            name: String!
            password: String
            createdEvents: [Event!]
        }

        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
            name: String!
        }

        type Booking {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            name: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
            bookings: [Booking!]!
            login(name: String!, password: String!): AuthData!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
            deleteEvent(eventId: ID!): Event!
            bookEvent(eventId: ID!): Booking!
            cancelBooking(bookingId: ID!): Event!
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
