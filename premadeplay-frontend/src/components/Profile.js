import "./Profile.css";

import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";

const HomePage = ({ user }) => {
	return (
		<div className="App">
			<Container className="main-container">
				<div className="personalInfo">
					<h1>Profile</h1>
					<p>Setup and update your profile</p>
				</div>
				<div className="gameInfo">
					<h2>League Of Legends Information Information</h2>
				</div>
			</Container>
		</div>
	);
};

export default HomePage;
