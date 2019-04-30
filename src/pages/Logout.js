import React, { useContext } from 'react';
import AuthContext from '~/context/auth';

const Logout = () => {
    const context = useContext(AuthContext);
    context.logout();
    return null;
};
export default Logout;
