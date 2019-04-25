import React from 'react';
import { render } from 'react-dom';
import Cookies from 'js-cookie';
import { UncontrolledAlert } from 'reactstrap';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/graphql',
    onError: ({ graphQLErrors, networkError }) => {
        //console.log('graphQLErrors, networkError: ', graphQLErrors, networkError);
        if (graphQLErrors.length) {
            render(
                <UncontrolledAlert color="danger">{graphQLErrors[0].message}</UncontrolledAlert>,
                document.getElementById('error')
            );
        }
        //if (networkError) console.log(`xxxxxxxxxx   [Network error]: ${networkError}`);
    },
    request: async operation => {
        // const token = await localStorage.getItem('token');
        const token = await Cookies.get('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    }
});

export default client;
