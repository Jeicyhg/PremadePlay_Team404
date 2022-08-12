import "./HomePage.css";
import Login from "./Login";
import PlayerList from "./PlayerList";

import React, { useState, useEffect, useCallback } from "react";
import Container from "react-bootstrap/Container";

const HomePage = ({ user, setUser }) => {
	return (
		<div className="App">
			<Container className="main-container">
				<div className="Filler">
					<h1>HomePage</h1>
					{user ? (
						<div>
							<p>
								Welcome <strong>{user.googleId}</strong>. <br /> Search below
								for a new teammate
							</p>
							<PlayerList />
						</div>
					) : (
						<div>
							<h1>Log in and start searching for your new teammates! </h1>
							<br />

							<Login setUser={setUser} />
							<PlayerList />
						</div>
					)}
				</div>
			</Container>
		</div>
	);
};

export default HomePage;
