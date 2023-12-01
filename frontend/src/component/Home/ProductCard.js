import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.image[0].Url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <span className="productCardSpan">
                    <Rating {...options} />
                </span>
                <span className="productCardSpan">
                    ({product.numOfReviews} Reviews)
                </span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
};

export default ProductCard;