import gql from 'graphql-tag';

export default gql`
    mutation createUser($user: UserInput) {
        createUser(userInput: $user) {
            email
        }
    }
`;
