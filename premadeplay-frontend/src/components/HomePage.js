import "./HomePage.css";
import Login from "./Login";
import PlayerList from "./PlayerList";
import IntroCarousel from "./IntroCarousel";

import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";

const HomePage = ({ user, setUser }) => {
	return (
		<div className="App">
			<Container className="main-container">
				<div className="content-container">
					{user ? (
						<div>
							<p>
								Welcome <strong>{user.googleId}</strong>.
								<br />
								Search below for a new teammate
							</p>
							<PlayerList user={user} />
						</div>
					) : (
						<div>
							<IntroCarousel />
							<hr className="break-line" />
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default HomePage;
