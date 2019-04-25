import React, { useState } from 'react';
import Cookies from 'js-cookie';

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
        token: Cookies.get('token'),
        userId: Cookies.get('userId'),
        name: Cookies.get('name')
    });

    const login = args => {
        const expiresIn = new Date(new Date().getTime() + args.tokenExpiration * 60 * 1000);
        setState({ token: args.token, userId: args.userId, name: args.name });

        Cookies.set('token', args.token, {
            expires: expiresIn
        });
        Cookies.set('userId', args.userId, {
            expires: expiresIn
        });
        Cookies.set('name', args.name, {
            expires: expiresIn
        });
    };
    const logout = () => {
        setState({ token: null, userId: null, name: null });
        Cookies.set('token', '');
        Cookies.set('userId', '');
        Cookies.set('name', '');
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

                                <Route path="/source" component={Source} />

                                {state.token && <Route path="/add_event" component={AddEvent} />}
                                {state.token && <Route path="/bookings" component={Bookings} />}

                                <Redirect from="/" to="/events" exact />

                                {state.token && <Redirect from="/login" to="/events" exact />}
                                {state.token && <Redirect from="/signup" to="/events" exact />}

                                {!state.token && <Redirect from="/add_event" to="/login" exact />}
                                {!state.token && <Redirect from="/bookings" to="/login" exact />}
                            </Switch>
                        </main>
                    </AuthContext.Provider>
                </React.Fragment>
            </HashRouter>
        </ApolloProvider>
    );
};

export default App;
