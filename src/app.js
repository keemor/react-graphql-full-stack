import React, { useState } from 'react';

import client from './gql/client';
import { ApolloProvider } from 'react-apollo-hooks';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Source from './components/source';
import MainNavigation from './components/navigation/Main';

import Events from './pages/Events';
import Bookings from './pages/Bookings';
import AddEvent from './pages/AddEvent';
import Login from './pages/Login';
import Signup from './pages/Signup';

import AuthContext from './context/auth';

const App = () => {
    const [state, setState] = useState({
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        name: localStorage.getItem('name')
    });

    const login = args => {
        // console.log('args: ', args);
        setState({ token: args.token, userId: args.userId, name: args.name });
        localStorage.setItem('token', args.token);
        localStorage.setItem('userId', args.userId);
        localStorage.setItem('name', args.name);
    };
    const logout = () => {
        setState({ token: null, userId: null, name: null });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
    };
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <React.Fragment>
                    <AuthContext.Provider
                        value={{
                            token: state.token,
                            userId: state.userId,
                            name: state.name,
                            login: login,
                            logout: logout
                        }}
                    >
                        <MainNavigation userId={state.userId} name={state.name} logout={logout} />
                        <main>
                            <Switch>
                                {!state.token && <Route path="/login" component={Login} />}
                                {!state.token && <Route path="/signup" component={Signup} />}

                                <Route path="/events" component={Events} />
                                <Route path="/bookings" component={Bookings} />
                                <Route path="/source" component={Source} />

                                {state.token && <Route path="/add_event" component={AddEvent} />}

                                <Redirect from="/" to="/events" exact />

                                {state.token && <Redirect from="/login" to="/events" exact />}
                                {state.token && <Redirect from="/signup" to="/events" exact />}

                                {!state.token && <Redirect from="/add_event" to="/login" exact />}
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </HashRouter>
        </ApolloProvider>
    );
};

export default App;
