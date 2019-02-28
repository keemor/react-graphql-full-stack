import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Source from './source';
import AddEvent from './addEvent';
import Events from './events';
import Auth from './pages/auth';

const client = new ApolloClient({
    uri: '/graphql'
});
{
    /* <Source />
                <AddEvent />
                <Events /> */
}
const App = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <Switch>
                    <Redirect from="/" to="/auth" exact />
                    <Route path="/auth" component={Auth} />
                    <Route path="/events" component={Events} />
                    <Route path="/add_event" component={AddEvent} />
                </Switch>
            </HashRouter>
        </ApolloProvider>
    );
};

export default App;
