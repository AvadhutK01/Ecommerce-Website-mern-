import React from "react";
import { CheckCircle } from "@mui/icons-material";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../actions/cartAction";


const OrderSuccess = () => {
    const dispatch = useDispatch();
    dispatch(clearCart());
    return (
        <div className="orderSuccess">
            <CheckCircle />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
};

export default OrderSuccess;