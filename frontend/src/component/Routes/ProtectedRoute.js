import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    if (isAuthenticated == true) {
        return <Fragment>{props.children}</Fragment>
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;
