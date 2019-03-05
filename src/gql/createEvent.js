import gql from 'graphql-tag';

export default gql`
    mutation createEvent($event: EventInput) {
        createEvent(eventInput: $event) {
            _id
            price
            title
        }
    }
`;
