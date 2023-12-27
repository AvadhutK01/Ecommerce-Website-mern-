import { Rating } from "@mui/material";
import React from "react";
import { useSelector } from 'react-redux'



const ReviewCard = ({ review }) => {
    const { user } = useSelector((state) => state.user);
    const options = {
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };

    return (
        <div className="reviewCard">
            <img src={user.avatar.url} alt="User" />
            <p>{review.name}</p>
            <Rating {...options} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
};

export default ReviewCard;