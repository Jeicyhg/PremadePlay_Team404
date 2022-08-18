import PlayersDAO from "../dao/playersDAO.js";
export default class PlayersController {
	static async apiGetPlayers(req, res, next) {
		const playersPerPage = req.query.moviesPerPage
			? parseInt(req.query.moviesPerPage)
			: 20;
		const page = req.query.page ? parseInt(req.query.page) : 0;

		let filters = {};
		if (req.query.solo_rank) {
			filters.solo_rank = req.query.solo_rank;
		}
		if (req.query.flex_rank) {
			filters.flex_rank = req.query.flex_rank;
		}
		if (req.query.tft_rank) {
			filters.tft_rank = req.query.tft_rank;
		}
		if (req.query.role) {
			filters.primary_role = req.query.role;
		}
		if (req.query.server) {
			filters.server = req.query.server;
		}
		if (req.query.language) {
			filters.language = req.query.language;
		}
		if (req.query.name) {
			filters.name = req.query.name;
		}

		const { playersList, totalNumPlayers } = await PlayersDAO.getPlayers({
			filters,
			page,
			playersPerPage,
		});

		let response = {
			players: playersList,
			page: page,
			filters: filters,
			entries_per_page: playersPerPage,
			total_results: totalNumPlayers,
		};
		res.json(response);
	}

	static async apiGetPlayerById(req, res, next) {
		try {
			let id = req.params.id || {};
			let player = await PlayersDAO.getPlayerById(id);
			if (!player) {
				res.status(404).json({ error: "not found" });
				return;
			}
			res.json(player);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetRankSolo(req, res, next) {
		try {
			let propertyTypes = await PlayersDAO.getRankSolo();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetRankFlex(req, res, next) {
		try {
			let propertyTypes = await PlayersDAO.getRankFlex();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetRankTft(req, res, next) {
		try {
			let propertyTypes = await PlayersDAO.getRankTft();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetRole(req, res, next) {
		try {
			let propertyTypes = await PlayersDAO.getRole();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetServer(req, res, next) {
		try {
			let propertyTypes = await PlayersDAO.getServer();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}

	static async apiGetLanguage(req, res, next) {
		try {
			let propertyTypes = await PlayersDAO.getLanguage();
			res.json(propertyTypes);
		} catch (e) {
			console.log(`API, ${e}`);
			res.status(500).json({ error: e });
		}
	}
}
