import gql from 'graphql-tag';

export default gql`
    mutation bookEvent($eventId: ID!) {
        bookEvent(eventId: $eventId) {
            _id
            createdAt
            updatedAt
        }
    }
`;
