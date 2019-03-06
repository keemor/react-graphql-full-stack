import gql from 'graphql-tag';

export default gql`
    query login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
            userId
            token
            tokenExpiration
            name
        }
    }
`;
