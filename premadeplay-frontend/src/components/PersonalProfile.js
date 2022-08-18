import "./PersonalProfile.css";

import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import ProfilesDataService from "../services/profiles";
const HomePage = ({ user }) => {

	const [profile, setProfile] = useState({
		user_id: null,
		name: "",
		rank: "",
		role: "",
		server: "",
		language: "",
		profile_pic: "",
		date: "",
	});

	useEffect(() => {
		const getProfile = (id) => {
			ProfilesDataService.getProfileByUserId(id).then((response) => {
                response.data.players.forEach((player) => {
                    if(player.user_id === id) {
                        setProfile(player);
                    }
                })
			});
		};

		getProfile("fasd9090@gmail.com");
        console.log(profile);
	}, [user]);

	// TODO: implement edit profile when user is in their own profile
    return (
        <div className="App">
        <Container className="main-container">
            <Row className="section1">
                <Col className="section1Col1">
                    <div>
                        <Image
                            className="bigPicture"
                            src={"/images/photoes/" + profile.profile_pic + ".jpeg"}
                            onError={({ currentTarget }) => {
                                currentTarget.onError = null;
                                currentTarget.src = "/images/photoes/0.jpeg";
                            }}
                            fluid
                        />
                    </div>
                </Col>
                <Col className="section1Col2">
                    <h1>{profile.name}</h1>
                </Col>
                <Col></Col>
            </Row>
            <Row className="section1">
                <Row className="seperator"></Row>
                <Row>
                    <h1>About Me</h1>
                </Row>
                <Row>
                    <Col>
                        <h1>{profile.language}</h1>
                    </Col>
                    <Col>
                        <h1>{profile.server}</h1>
                    </Col>
                </Row>
            </Row>

            <Row className="section1">
                <Row className="seperator"></Row>
                <Row>
                    <h1>Roles</h1>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Image
                                className="role"
                                src={
                                    "/images/role_photo/Position_Challenger-" +
                                    profile.primary_role +
                                    ".png"
                                }
                                onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src =
                                        "/images/role_photo/Position_Challenger-JGL.png";
                                }}
                                fluid
                            />
                        </div>
                        <h1>{profile.primary_role}</h1>
                    </Col>
                    <Col>
                        <div>
                            <Image
                                className="role"
                                src={
                                    "/images/role_photo/Position_Challenger-" +
                                    profile.secondary_role +
                                    ".png"
                                }
                                onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src =
                                        "/images/role_photo/Position_Challenger-JGL.png";
                                }}
                                fluid
                            />
                        </div>
                        <h1>{profile.secondary_role}</h1>
                    </Col>
                </Row>
            </Row>
            <Row className="section1">
                <Row className="seperator"></Row>
                <Row>
                    <h1>Ranks</h1>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <Image
                                className="rank"
                                src={"/images/rank_photo/" + profile.solo_rank + ".png"}
                                onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src = "/images/rank_photo/Bronze.png";
                                }}
                                fluid
                            />
                        </div>
                        <h1>{profile.solo_rank}</h1>
                    </Col>
                    <Col>
                        <div>
                            <Image
                                className="rank"
                                src={"/images/rank_photo/" + profile.flex_rank + ".png"}
                                onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src = "/images/rank_photo/Platinum.png";
                                }}
                                fluid
                            />
                        </div>
                        <h1>{profile.flex_rank}</h1>
                    </Col>
                    <Col>
                        <div>
                            <Image
                                className="rank"
                                src={"/images/rank_photo/" + profile.tft_rank + ".png"}
                                onError={({ currentTarget }) => {
                                    currentTarget.onError = null;
                                    currentTarget.src = "/images/rank_photo/Platinum.png";
                                }}
                                fluid
                            />
                        </div>
                        <h1>{profile.tft_rank}</h1>
                    </Col>
                </Row>
            </Row>
            <Row className="section1">
                <div>
                    <Button
                        className="return button"
                        variant="link"
                        onClick={() => window.history.back()}
                    >
                        return
                    </Button>
                    <Link className=" edit button" to={{
                        pathname: "/registration"
                    }}
                    state ={{
                        currentProfile: profile
                    }} >
                        Edit
                    </Link>
                </div>
            </Row>
        </Container>
    </div>
    )
};

export default HomePage;