import gql from 'graphql-tag';

export default gql`
    {
        bookings {
            _id
            createdAt
            event {
                _id
                title
                date
            }
        }
    }
`;
