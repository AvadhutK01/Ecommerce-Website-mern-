import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { loading, isAuthenticated } = useSelector((state) => state.user);
    if (loading == false) {
        if (isAuthenticated == true) {
            return <Fragment>{props.children}</Fragment>
        } else {
            return <Navigate to="/login" />;
        }
    }
};

export default ProtectedRoute;
