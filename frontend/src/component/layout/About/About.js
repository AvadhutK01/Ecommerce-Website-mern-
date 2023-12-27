import React from "react";
import "./aboutSection.css";
import { Button, Header, Image } from 'semantic-ui-react';
import MetaData from "../MetaData";
const About = () => {
    const visitInstagram = () => {
        window.location = "";
    };
    return (
        <div className="aboutSection">
            <MetaData title={"About Us"} />
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Header component="h1">About Us</Header>

                <div>
                    <div>
                        <Image
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src=""
                            alt="Founder"
                        />
                        <Header>Avadhut Kelaskar</Header>
                        <Button onClick={visitInstagram} color="primary">
                            Visit Instagram
                        </Button>
                        <span>

                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;