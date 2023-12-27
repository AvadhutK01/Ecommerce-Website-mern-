import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = (props) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    const isAdmin = isAuthenticated && user && user.role === 'admin';
    if (isAuthenticated) {
        if (!isAdmin) {
            return <Navigate to="/" />;
        }

        return <Fragment>{props.children}</Fragment>
    }
    else {
        return <Navigate to="/login" />;
    }
};

export default AdminRoute;
