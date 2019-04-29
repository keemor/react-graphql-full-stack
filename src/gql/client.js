import React from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';
import { UncontrolledAlert } from 'reactstrap';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/graphql',
    onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors.length) {
            render(
                <UncontrolledAlert color="danger">{graphQLErrors[0].message}</UncontrolledAlert>,
                document.getElementById('error')
            );
        }
    },
    request: async operation => {
        render(<span />, document.getElementById('error'));
        const token = await Cookies.get('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    }
});

export default client;
