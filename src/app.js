import React, { Component } from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { UncontrolledAlert } from 'reactstrap';

import Source from './components/source';
import AddEvent from './components/addEvent';
import MainNavigation from './components/navigation/Main';

import Events from './pages/Events';
import Login from './pages/Login';
import Signup from './pages/Signup';

import AuthContext from './context/auth';
import { MdLocalGasStation } from 'react-icons/md';

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
        userId: localStorage.getItem('userId'),
        name: localStorage.getItem('name')
    };

    login = args => {
        this.setState({ token: args.token, userId: args.userId, name: args.name });
        localStorage.setItem('token', args.token);
        localStorage.setItem('userId', args.userId);
        localStorage.setItem('name', args.name);
    };
    logout = () => {
        this.setState({ token: null, userId: null, name: null });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
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
                                name: this.state.name,
                                login: this.login,
                                logout: this.logout
                            }}
                        >
                            <MainNavigation userId={this.state.userId} name={this.state.name} logout={this.logout} />
                            <main>
                                <Switch>
                                    {!this.state.token && <Route path="/login" component={Login} />}
                                    {!this.state.token && <Route path="/signup" component={Signup} />}

                                    <Route path="/events" component={Events} />
                                    <Route path="/source" component={Source} />

                                    {this.state.token && <Route path="/add_event" component={AddEvent} />}

                                    <Redirect from="/" to="/events" exact />

                                    {this.state.token && <Redirect from="/login" to="/events" exact />}
                                    {!this.state.token && <Redirect from="/signup" to="/login" exact />}
                                    {!this.state.token && <Redirect from="/add_event" to="/login" exact />}
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
