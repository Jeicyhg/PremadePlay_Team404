import React, { useState, useEffect, useCallback } from "react";
import ProfilesDataService from "../services/profiles";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
// import "./PlayerList.css";

const PlayerList = ({ user }) => {
	// useState to set state values
	const [players, setPlayers] = useState([]);
	const [searchUsername, setSearchUsername] = useState("");
	const [gameMode, setGameMode] = useState("");
	const [gameRank, setGameRank] = useState("");
	const [searchRank, setSearchRank] = useState("");
	const [searchRole, setSearchRole] = useState("");
	const [searchServer, setSearchServer] = useState("");
	const [searchLanguage, setSearchLanguage] = useState("");
	const [ranks, setRanks] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [roles, setRoles] = useState([]);
	const [servers, setServers] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [entriesPerPage, setEntriesPerPage] = useState(0);
	const [currentSearchMode, setCurrentSearchMode] = useState("");

	const [searchCriteria, setSearchCriteria] = useState({
		solo_rank: "",
		flex_rank: "",
		tft_rank: "",
		role: "",
		server: "",
		language: "",
		page: "",
	});

	// get initial values for search bar

	const retrieveRanks = useCallback(() => {
		// TODO: UPDATE BACKEND apiGetRank in players.controller.js
		//       to allow searching for correct ranks
		// ProfilesDataService.getRanks()
		// 	.then((response) => {
		// 		setRanks(["All Ranks"].concat(response.data));
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
		console.log("Retrieving ranks...");
		setRanks([
			"All Ranks",
			"Iron",
			"Bronze",
			"Silver",
			"Gold",
			"Platinum",
			"Diamond",
			"Master",
			"Grandmaster",
			"Challenger",
		]);
	}, []);

	const retrieveLanguages = useCallback(async () => {
		console.log("Retrieving languages...");
		await ProfilesDataService.getLanguages()
			.then((response) => {
				setLanguages(["All Languages"].concat(response.data));
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const retrieveRoles = useCallback(async () => {
		console.log("Retrieving roles...");
		await ProfilesDataService.getRoles()
			.then((response) => {
				setRoles(["All Roles"].concat(response.data));
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	const retrieveServers = useCallback(async () => {
		console.log("Retrieving servers...");
		await ProfilesDataService.getServers()
			.then((response) => {
				setServers(["All Servers"].concat(response.data));
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	// useEffect to set page and retrieve search criteria fields
	useEffect(() => {
		console.log("USE_EFFECT RANKS");
		retrieveRanks();
	}, [retrieveRanks]);

	useEffect(() => {
		console.log("USE_EFFECT LANGS");
		retrieveLanguages();
	}, [retrieveLanguages]);

	useEffect(() => {
		console.log("USE_EFFECT ROLES");
		retrieveRoles();
	}, [retrieveRoles]);

	useEffect(() => {
		console.log("USE_EFFECT SERVS");
		retrieveServers();
	}, [retrieveServers]);

	useEffect(() => {
		console.log("USE_EFFECT PAGE");
		setCurrentPage(0);
	}, [currentSearchMode]);

	useEffect(() => {
		console.log("RET");
		retrievePlayers();
	}, []);

	// Retrieve list of all players, no filters

	const retrievePlayers = useCallback(() => {
		// TODO: debug multiple unwanted queries
		ProfilesDataService.getAll(currentPage)
			.then((response) => {
				setPlayers(response.data.players);
				setCurrentPage(response.data.page);
				setEntriesPerPage(response.data.entries_per_page);
			})
			.catch((e) => {
				console.log(e);
			});
	}, [currentPage]);

	// Lookup list of players with filters on

	// const find = useCallback(
	// 	(query, by) => {
	// 		ProfilesDataService.find(query, by, currentPage)
	// 			.then((response) => {
	// 				setPlayers(response.data.players);
	// 			})
	// 			.catch((e) => {
	// 				console.log(e);
	// 			});
	// 	},
	// 	[currentPage]
	// );

	// Update filters and lookup new list as needed

	const searchFilteredList = useCallback(() => {
		// TODO: implement this
	}, []);

	const findByUsername = useCallback(() => {
		// TODO: implement this
	}, []);

	const findByRank = useCallback(() => {
		// TODO: implement this
	}, []);

	const findByRole = useCallback(() => {
		// TODO: implement this
	}, []);

	const findByLanguage = useCallback(() => {
		// TODO: implement this
	}, []);

	// Lookup next page of filtered players

	const retrieveNextPage = useCallback(() => {
		// TODO: implement this
		// if (currentSearchMode === "findByUsername") {
		// 	findByUsername();
		// } else if (currentSearchMode === "findByRank") {
		// 	findByRank();
		// } else {
		// 	retrievePlayers();
		// }
	}, []);

	// Retrieve the next page if currentPage value changes
	// useEffect(() => {
	// 	retrieveNextPage();
	// }, [currentPage, retrieveNextPage]);

	// Update seachCriteria as needed

	const onChangeSearchUsername = (e) => {
		const searchUsername = e.target.value;
		setSearchUsername(searchUsername);
	};

	const onChangeSearchLanguage = (e) => {
		const searchLanguage = e.target.value;
		setSearchLanguage(searchLanguage);
	};

	const onChangeGameMode = (e) => {
		const searchLanguage = e.target.value;
		setGameMode(searchLanguage);
		if (gameMode !== "All") {
		}
	};

	const onChangeSearchRank = (e) => {
		const searchRank = e.target.value;
		setSearchRank(searchRank);
	};

	const onChangeSearchServer = (e) => {
		const searchLanguage = e.target.value;
		setSearchServer(searchLanguage);
	};
	const onChangeSearchRole = (e) => {
		const searchRole = e.target.value;
		setSearchRole(searchRole);
	};

	return (
		<div className="App">
			<Container className="main-container">
				<Form>
					<Row>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control
									type="text"
									placeholder="Search by username"
									value={searchUsername}
									onChange={onChangeSearchUsername}
								/>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control as="select" onChange={onChangeGameMode}>
									{[
										"All Ranked Queues",
										"solo_rank",
										"flex_rank",
										"tft_rank",
									].map((rank, i) => {
										return (
											<option value={rank} key={i}>
												{rank}
											</option>
										);
									})}
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3">
								<Form.Control as="select" onChange={onChangeSearchRank}>
									{ranks.map((rank, i) => {
										return (
											<option value={rank} key={i}>
												{rank}
											</option>
										);
									})}
								</Form.Control>
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
						<Col>
							<Button
								variant="primary"
								type="button"
								onClick={searchFilteredList}
							>
								Search
							</Button>
						</Col>
					</Row>
				</Form>
				<Row className="playerRow">
					{players.map((player) => {
						return (
							<Col key={player._id}>
								{console.log(1)}
								{/* {console.log(player._id)}
								{console.log(player.name)}
								{console.log(player.solo_rank)} */}
								<Card className="playersListCard">
									<Card.Img
										className="smallPoster"
										src="/images/icons/bawk.jpg"
										onError={({ currentTarget }) => {
											currentTarget.onError = null;
											currentTarget.src = "/images/icons/ahri.jpg";
										}}
									/>
									<Card.Body>
										<Card.Title>{player.name}</Card.Title>
										<Card.Subtitle>
											Role: <br /> {player.role ? player.role : "Unknown"}
										</Card.Subtitle>
										<Link to={"/profile/" + player._id}>View Details</Link>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
				<br />
				Showing page: {currentPage + 1}.
				<Button
					variant="link"
					onClick={() => {
						setCurrentPage(currentPage + 1);
					}}
				>
					Get next {entriesPerPage} results
				</Button>
			</Container>
		</div>
	);
};

export default PlayerList;
