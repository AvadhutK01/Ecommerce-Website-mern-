import React, { useState } from "react";
import MetaData from "../layout/MetaData";
import { useNavigate } from 'react-router-dom';

import "./Search.css";

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        } else {
            navigate("/products");
        }
    };

    return (
        <>
            <MetaData title="Search A Product -- ECOMMERCE" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    );
};

export default Search;
