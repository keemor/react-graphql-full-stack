import gql from 'graphql-tag';

export default gql`
    mutation deleteEvent($eventId: ID!) {
        deleteEvent(eventId: $eventId) {
            title
        }
    }
`;
