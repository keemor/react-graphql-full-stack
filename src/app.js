import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Source from './components/source';
import AddEvent from './components/addEvent';
import MainNavigation from './components/navigation/Main';

import Events from './pages/Events';
import Auth from './pages/Auth';

import AuthContext from './context/auth';
import { MdLocalGasStation } from 'react-icons/md';

const client = new ApolloClient({
    uri: '/graphql',
    request: async operation => {
        const token = await localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        });
    }
});

class App extends Component {
    state = {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId')
    };

    login = args => {
        this.setState({ token: args.token, userId: args.userId });
        localStorage.setItem('token', args.token);
        localStorage.setItem('userId', args.userId);
    };
    logout = () => {
        this.setState({ token: null, userId: null });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };
    render() {
        //console.log('state: ', this.state);
        return (
            <ApolloProvider client={client}>
                <HashRouter>
                    <React.Fragment>
                        <AuthContext.Provider
                            value={{
                                token: this.state.token,
                                userId: this.state.userId,
                                login: this.login,
                                logout: this.logout
                            }}
                        >
                            <MainNavigation userId={this.state.userId} logout={this.logout} />
                            <main>
                                <Switch>
                                    {this.state.token && <Redirect from="/" to="/events" exact />}
                                    {this.state.token && <Redirect from="/auth" to="/events" exact />}

                                    {!this.state.token && <Route path="/auth" component={Auth} />}

                                    <Route path="/events" component={Events} />
                                    <Route path="/source" component={Source} />

                                    {this.state.token && <Route path="/add_event" component={AddEvent} />}
                                    {!this.state.token && <Redirect to="/auth" exact />}
                                </Switch>
                            </main>
                        </AuthContext.Provider>
                    </React.Fragment>
                </HashRouter>
            </ApolloProvider>
        );
    }
}

export default App;
