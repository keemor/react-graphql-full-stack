import gql from 'graphql-tag';

export default gql`
    {
        bookings {
            _id
            createdAt
            user {
                name
            }
            event {
                _id
                title
                date
            }
        }
    }
`;
