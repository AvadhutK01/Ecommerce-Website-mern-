import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import axios from "axios";
import { createOrder, clearErrors } from "../../actions/orderAction";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom"
import "./Payment.css";

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const [Razorpay] = useRazorpay();
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const { data } = await axios.post("/api/v1/payment/process", {
                amount: orderInfo.totalPrice,
            });
            const options = data.options;
            const successCallback = (payment_id) => {
                order.paymentInfo = {
                    id: payment_id,
                    status: "paid",
                };

                dispatch(createOrder(order));

                Navigate("/success");
            };

            const cancelCallback = () => {
                payBtn.current.disabled = false;
            };
            const rzp1 = new Razorpay({
                key: options.key,
                amount: options.amount * 100,
                currency: options.currency,
                handler: successCallback,
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    ondismiss: cancelCallback,
                },
            });
            rzp1.open();
        } catch (error) {
            payBtn.current.disabled = false;
        }
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Make payment to proceed</Typography>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;
