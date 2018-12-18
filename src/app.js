import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Events from './events';
import AddEvent from './addEvent';

const client = new ApolloClient({
    uri: '/graphql'
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <AddEvent />
                <Events />
            </ApolloProvider>
        );
    }
}

export default App;