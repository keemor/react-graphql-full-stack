import gql from 'graphql-tag';

export default gql`
{
    events {
        title
        price
        date
        _id
      }   
  }
`;