import React, { Fragment } from "react";
import { FaMouse } from 'react-icons/fa';
import "./Home.css";
import MetaData from "../layout/MetaData";
const Home = () => {


    return (
        <Fragment>

            <Fragment>
                <MetaData title="ECOMMERCE" />

                <div className="banner">
                    <p>Welcome to Ecommerce</p>
                    <h1>FIND AMAZING PRODUCTS BELOW</h1>

                    <a href="#container">
                        <button>
                            Scroll <FaMouse />
                        </button>
                    </a>
                </div>

                <h2 className="homeHeading">Featured Products</h2>
                <div className="container" id="container">

                </div>
            </Fragment>
            )
        </Fragment>
    );
};

export default Home;