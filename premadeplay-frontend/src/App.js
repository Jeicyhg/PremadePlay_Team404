import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Logout from "./components/Logout";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import PersonalProfile from "./components/PersonalProfile";
import ProfilesDataService from "./services/profiles";
const ourClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [userProfileComplete, setUserProfileComplete] = useState(false);

	useEffect(() => {
		let loginData = JSON.parse(localStorage.getItem("login"));
		if (loginData) {
			let loginExp = loginData.exp;
			let now = Date.now() / 1000;
			if (now < loginExp) {
				// Not expired
				setUser(loginData);
			} else {
				// Expired
				localStorage.setItem("login", null);
			}
		}
	}, []);

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
	//see if the user's data in our database.
	const retrieveUserProfile = useCallback(() => {
		const getProfile = (id) => {
			ProfilesDataService.getProfileByUserId(id).then((response) => {
				response.data.players.forEach((player) => {
					if (player.user_id === id) {
						setProfile(player);
						navigate("/home");
					}
				});
			});
		};
		getProfile(user.email);
		navigate("/registration");
	}, [user]);

	useEffect(() => {
		if (user) {
			retrieveUserProfile();
		}
	}, [user, retrieveUserProfile]);

	return (
		<GoogleOAuthProvider clientId={ourClientId}>
			<div className="App">
				<Navbar className="navbar navbar-dark bg-dark" expand="lg" sticky="top">
					<Container className="container-fluid">
						<Navbar.Brand className="brand" href="/">
							<img
								src="/images/PremadePlay.png"
								alt="logo"
								className="premadePlayLogo"
							/>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className="ml-auto">
								<Nav.Link as={Link} to={"/home"}>
									Home
								</Nav.Link>
								{user && (
									<Nav.Link as={Link} to={"/PersonalProfile"}>
										Profile
									</Nav.Link>
								)}
							</Nav>
						</Navbar.Collapse>
						{user ? <Logout setUser={setUser} /> : <Login setUser={setUser} />}
					</Container>
				</Navbar>
				<Routes>
					<Route
						exact
						path={"/"}
						element={<HomePage user={user} setUser={setUser} />}
					/>
					<Route
						exact
						path={"/home"}
						element={<HomePage user={user} setUser={setUser} />}
					/>
					<Route
						exact
						path={"/profile/:id/"}
						element={<Profile user={user} />}
					/>
					<Route exact path={"/profile"} element={<Profile user={user} />} />
					<Route
						exact
						path={"/registration"}
						element={<Registration user={user} />}
					/>
					<Route
						exact
						path={"/personalProfile"}
						element={<PersonalProfile user={user} />}
					/>
				</Routes>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
