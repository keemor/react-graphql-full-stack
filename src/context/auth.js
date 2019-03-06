import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    name: null,
    login: () => {},
    logout: () => {}
});
