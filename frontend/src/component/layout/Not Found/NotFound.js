import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";
import { MdError } from "react-icons/md";

const NotFound = () => {
    return (
        <div className="PageNotFound">
            <MdError />

            <Header>Page Not Found </Header>
            <Link to="/">Home</Link>
        </div>
    );
};

export default NotFound;