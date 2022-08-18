import React, { useState, useEffect, useCallback } from "react";
import ProfilesDataService from "../services/profiles";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import "./PlayerList.css";

const PlayerList = ({ user }) => {
	// useState to set players in page
	const [players, setPlayers] = useState([]);
	const user_email = user.email;

	// search criteria to use for filtered search
	const [searchUsername, setSearchUsername] = useState("");
	const [searchRole, setSearchRole] = useState("");
	const [searchServer, setSearchServer] = useState("");
	const [searchLanguage, setSearchLanguage] = useState("");
	// GAME MODES === solo / flex / tft
	// GAME RANKS === iron / bronze / silver / gold / etc...
	const [gameMode, setGameMode] = useState("All Game Modes");
	const [searchRank, setSearchRank] = useState("");

	// searchbar lists for possible filter fields
	const [ranksSolo, setRanksSolo] = useState(["All Solo Ranks"]);
	const [ranksFlex, setRanksFlex] = useState(["All Flex Ranks"]);
	const [ranksTft, setRanksTft] = useState(["All Tft Ranks"]);
	const [languages, setLanguages] = useState(["All Languages"]);
	const [roles, setRoles] = useState(["All Roles"]);
	const [servers, setServers] = useState(["All Servers"]);

	// page and playerlist details
	const [currentPage, setCurrentPage] = useState(0);
	const entriesPerPage = 20;
	const [totalResultPages, setTotalResultPages] = useState(0);

	// useEffect to retrieve search criteria fields in search bar
	useEffect(() => {
		console.log("USE_EFFECT solo ranks");
		(async () => {
			let data;
			try {
				data = (await ProfilesDataService.getRanksSolo()).data;
			} catch (error) {
				console.log(error);
				data = [];
			}
			if (data) {
				setRanksSolo((prev) => [...prev, ...data]);
			}
		})();
	}, []);

	useEffect(() => {
		console.log("USE_EFFECT flex ranks");
		(async () => {
			let data;
			try {
				data = (await ProfilesDataService.getRanksFlex()).data;
			} catch (error) {
				console.log(error);
				data = [];
			}
			if (data) {
				setRanksFlex((prev) => [...prev, ...data]);
			}
		})();
	}, []);

	useEffect(() => {
		console.log("USE_EFFECT tft ranks");
		(async () => {
			let data;
			try {
				data = (await ProfilesDataService.getRanksTft()).data;
			} catch (error) {
				console.log(error);
				data = [];
			}
			if (data) {
				setRanksTft((prev) => [...prev, ...data]);
			}
		})();
	}, []);

	useEffect(() => {
		console.log("USE_EFFECT roles");
		(async () => {
			let data;
			try {
				data = (await ProfilesDataService.getRoles()).data;
				console.log(data);
			} catch (error) {
				console.log(error);
				data = [];
			}
			if (data) {
				setRoles((prev) => [...prev, ...data]);
			}
		})();
	}, []);

	useEffect(() => {
		console.log("USE_EFFECT servers");
		(async () => {
			let data;
			try {
				data = (await ProfilesDataService.getServers()).data;
			} catch (error) {
				console.log(error);
				data = [];
			}
			if (data) {
				setServers((prev) => [...prev, ...data]);
			}
		})();
	}, []);

	useEffect(() => {
		console.log("USE_EFFECT Languages");
		(async () => {
			let data;
			try {
				data = (await ProfilesDataService.getLanguages()).data;
			} catch (error) {
				console.log(error);
				data = [];
			}
			if (data) {
				setLanguages((prev) => [...prev, ...data]);
			}
		})();
	}, []);

	// Retrieve initial Players list (no filters) from server
	useEffect(() => {
		console.log("INITIAL RETRIEVE");
		(async () => {
			let fetchedPlayers;
			var totalPlayers = 0;
			try {
				let response = (await ProfilesDataService.getAll(0)).data;
				response.players.forEach((player, index) => {
					if (player.user_id === user_email) {
						response.players.splice(index, 1);
					}
				});
				fetchedPlayers = response.players;
				totalPlayers = response.total_results;
			} catch (error) {
				console.log(error);
				fetchedPlayers = [];
			}
			setPlayers(fetchedPlayers);
			let totalPages = Math.ceil(totalPlayers / entriesPerPage);
			console.log(totalPages);
			setTotalResultPages(totalPages);
		})();
	}, []);

	// Update filters and lookup new players lists on click
	const searchFilteredList = useCallback(async () => {
		console.log("Searching players...");
		const searchCriteria = {
			solo_rank: "",
			flex_rank: "",
			tft_rank: "",
			role: "",
			server: "",
			language: "",
		};

		if (searchRole && !searchRole.includes("All")) {
			searchCriteria.role = searchRole;
		}
		if (searchServer && !searchServer.includes("All")) {
			searchCriteria.server = searchServer;
		}
		if (searchLanguage && !searchLanguage.includes("All")) {
			searchCriteria.language = searchLanguage;
		}
		if (searchUsername && !searchUsername.includes("All")) {
			searchCriteria.username = searchUsername;
		}
		if (gameMode && !gameMode.includes("All")) {
			if (gameMode === "solo_rank") {
				searchCriteria.solo_rank = searchRank;
				searchCriteria.flex_rank = "";
				searchCriteria.tft_rank = "";
			} else if (gameMode === "flex_rank") {
				searchCriteria.solo_rank = "";
				searchCriteria.flex_rank = searchRank;
				searchCriteria.tft_rank = "";
			} else if (gameMode === "tft_rank") {
				searchCriteria.solo_rank = "";
				searchCriteria.flex_rank = "";
				searchCriteria.tft_rank = searchRank;
			}
		}

		let fetchedPlayers;
		var totalPlayers = 0;

		console.log(searchCriteria);
		Object.keys(searchCriteria).forEach((key) => {
			if (searchCriteria[key] === "") {
				delete searchCriteria[key];
			}
		});
		console.log(searchCriteria);

		try {
			let response = await ProfilesDataService.find(
				searchCriteria,
				currentPage
			);
			fetchedPlayers = response.data.players;
			fetchedPlayers.forEach((player, index) => {
				if (player.user_id === user_email) {
					fetchedPlayers.splice(index, 1);
				}
			});
			totalPlayers = response.data.total_results;
		} catch (error) {
			console.log(error);
			fetchedPlayers = [];
		}
		console.log(fetchedPlayers);
		setPlayers(fetchedPlayers);
		let totalPages = Math.ceil(totalPlayers / entriesPerPage);
		console.log(totalPages);
		setTotalResultPages(totalPages);
	}, [
		currentPage,
		gameMode,
		searchLanguage,
		searchRank,
		searchRole,
		searchServer,
		searchUsername,
		user_email,
	]);

	const startFilteredSearch = (e) => {
		setCurrentPage(0);
		searchFilteredList();
	};

	const clearSearchFilters = (e) => {
		window.location.reload(false);
	};

	// Update seachCriteria as needed

	const onChangeSearchUsername = (e) => {
		const newSearchUsername = e.target.value;
		setSearchUsername(newSearchUsername);
	};

	const onChangeSearchLanguage = (e) => {
		const newSearchLanguage = e.target.value;
		if (newSearchLanguage !== "All languages") {
			setSearchLanguage(newSearchLanguage);
		}
	};

	const onChangeGameMode = (e) => {
		const newSearchGameMode = e.target.value;
		if (newSearchGameMode === "All Game Modes") {
			setSearchRank("");
			setGameMode("");
		} else {
			setGameMode(newSearchGameMode);
		}
	};

	const onChangeSearchRank = (e) => {
		const newSearchRank = e.target.value;
		if (newSearchRank.includes("All ")) {
			setSearchRank("");
		} else {
			setSearchRank(newSearchRank);
		}
	};

	const onChangeSearchServer = (e) => {
		const newSearchServer = e.target.value;
		if (newSearchServer === "All Servers") {
			setSearchServer("");
		} else {
			setSearchServer(newSearchServer);
		}
	};

	const onChangeSearchRole = (e) => {
		const newSearchRole = e.target.value;
		if (newSearchRole === "All Roles") {
			setSearchRole("");
		} else {
			setSearchRole(newSearchRole);
		}
	};

	return (
		<div className="PlayerListContainer">
			<Container className="cards-container">
				<Form>
					<Row>
						<h2>Player Search</h2>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="Search by username"
									onChange={onChangeSearchUsername}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control as="select" onChange={onChangeGameMode}>
									{["All Game Modes", "solo_rank", "flex_rank", "tft_rank"].map(
										(rank, i) => {
											return (
												<option value={rank} key={i}>
													{rank}
												</option>
											);
										}
									)}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								{gameMode === "All Game Modes" ? (
									<Form.Control
										type="text"
										placeholder="Select a Game Mode First"
										aria-label="Disabled until game mode is selected"
										disabled
										readOnly
									/>
								) : (
									<Form.Control as="select" onChange={onChangeSearchRank}>
										{gameMode === "solo_rank" &&
											ranksSolo.map((rank, i) => {
												return (
													<option value={rank} key={i}>
														{rank}
													</option>
												);
											})}
										{gameMode === "flex_rank" &&
											ranksFlex.map((rank, i) => {
												return (
													<option value={rank} key={i}>
														{rank}
													</option>
												);
											})}
										{gameMode === "tft_rank" &&
											ranksTft.map((rank, i) => {
												return (
													<option value={rank} key={i}>
														{rank}
													</option>
												);
											})}
									</Form.Control>
								)}
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control as="select" onChange={onChangeSearchServer}>
									{servers.map((server, i) => {
										return (
											<option value={server} key={i}>
												{server}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control as="select" onChange={onChangeSearchLanguage}>
									{languages.map((language, i) => {
										return (
											<option value={language} key={i}>
												{language}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control as="select" onChange={onChangeSearchRole}>
									{roles.map((role, i) => {
										return (
											<option value={role} key={i}>
												{role}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col xs={9} className="d-grid gap-2">
							<Button
								variant="primary"
								type="button"
								onClick={startFilteredSearch}
							>
								Search
							</Button>
						</Col>
						<Col xs={3} className="d-grid gap-2">
							<Button
								variant="secondary"
								type="button"
								onClick={clearSearchFilters}
							>
								Clear Filters
							</Button>
						</Col>
					</Row>
				</Form>
				<br />
				<br />
				<Row xs={2} md={4} className="playerRow">
					{players.map((player) => {
						return (
							<Col key={player._id}>
								{user && user.email !== player.user_id && (
									<Card className="playersListCard">
										<Card.Img
											className="smallPoster playerCardImg"
											src={"/images/photoes/" + player.profile_pic + ".jpeg"}
											onError={({ currentTarget }) => {
												currentTarget.onError = null;
												currentTarget.src = "/images/photoes/0.jpeg";
											}}
										/>
										<Card.Body>
											<Card.Title>{player.name}</Card.Title>
											<Card.Subtitle>
												Role: <br />{" "}
												{player.primary_role ? player.primary_role : "Unknown"}
											</Card.Subtitle>
											<Link to={"/profile/" + player._id}>
												<Button
													className="cardButton"
													variant="outline-warning"
												>
													View Full Profile
												</Button>
											</Link>
										</Card.Body>
									</Card>
								)}
							</Col>
						);
					})}
				</Row>

				<br />
				<br />
				<Row className="justify-content-md-center">
					<Col sm={1} className="pageButton">
						{currentPage > 0 && (
							<Button
								variant="primary"
								onClick={() => setCurrentPage(currentPage - 1)}
							>
								Prev
							</Button>
						)}
					</Col>

					<Col md="auto">
						<p>
							Page {currentPage + 1} of {totalResultPages}
						</p>
					</Col>
					<Col sm={1} className="pageButton">
						{currentPage + 1 < totalResultPages && (
							<Button
								variant="primary"
								onClick={() => setCurrentPage(currentPage + 1)}
							>
								Next
							</Button>
						)}
					</Col>
				</Row>
			</Container>
			<br />
		</div>
	);
};

export default PlayerList;
