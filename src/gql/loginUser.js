import gql from 'graphql-tag';

export default gql`
    query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
            email
        }
    }
`;
