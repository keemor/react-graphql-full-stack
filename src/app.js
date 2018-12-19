import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.min.css';

import Source from './source';
import AddEvent from './addEvent';
import Events from './events';

const client = new ApolloClient({
    uri: '/graphql'
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Source />
            <AddEvent />
            <Events />
        </ApolloProvider>
    );
};

export default App;