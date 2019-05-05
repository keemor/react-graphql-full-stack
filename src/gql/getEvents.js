import gql from 'graphql-tag';

export default gql`
    {
        events {
            _id
            title
            price
            date
            description
            creator {
                _id
                name
            }
        }
    }
`;
