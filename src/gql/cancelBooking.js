import gql from 'graphql-tag';

export default gql`
    mutation cancelBooking($bookingId: ID!) {
        cancelBooking(bookingId: $bookingId) {
            title
        }
    }
`;
