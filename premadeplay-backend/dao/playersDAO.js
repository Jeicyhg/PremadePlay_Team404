import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let players;

export default class PlayersDAO {
	static async injectDB(conn) {
		if (players) {
			return;
		}
		try {
			players = await conn
				.db(process.env.PLAYERREVIEWS_NS)
				.collection("profile");
		} catch (e) {
			console.error(`Unable to connect in PlayersDAO: ${e}`);
		}
	}

	static async getPlayers({
		filters = null,
		page = 0,
		playersPerPage = 20,
	} = {}) {
		// empty object is default parameter in case arg is undefined
		let queryText = {};
		let querySoloRank = {};
		let queryFlexRank = {};
		let queryTftRank = {};
		let queryRole = {};
		let queryServer = {};
		let queryLanguage = {};

		if (filters) {
			if ("name" in filters) {
				queryText = { $text: { $search: filters["name"] } };
			}
			if ("solo_rank" in filters) {
				querySoloRank = { solo_rank: { $eq: filters["solo_rank"] } };
			}
			if ("flex_rank" in filters) {
				queryFlexRank = { flex_rank: { $eq: filters["flex_rank"] } };
			}
			if ("tft_rank" in filters) {
				queryTftRank = { tft_rank: { $eq: filters["tft_rank"] } };
			}
			if ("primary_role" in filters) {
				queryRole = { primary_role: { $eq: filters["primary_role"] } };
			}
			if ("server" in filters) {
				queryServer = { server: { $eq: filters["server"] } };
			}
			if ("language" in filters) {
				queryLanguage = { language: { $eq: filters["language"] } };
			}
		}
		//assgin all object together
		let query = Object.assign(
			queryText,
			querySoloRank,
			queryFlexRank,
			queryTftRank,
			queryRole,
			queryServer,
			queryLanguage
		);
		// empty object will return all of profiles
		let cursor;
		try {
			cursor = await players
				.find(query)
				.limit(playersPerPage)
				.skip(playersPerPage * page);
			const playersList = await cursor.toArray();
			const totalNumPlayers = await players.countDocuments(query);
			return { playersList, totalNumPlayers };
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { playersList: [], totalNumPlayers: 0 };
		}
	}

	static async getRankSolo() {
		let rank = [];
		try {
			rank = await players.distinct("solo_rank");
			return rank;
		} catch (e) {
			console.error(`Unable to get solo rank, ${e}`);
			return rank;
		}
	}

	static async getRankFlex() {
		let rank = [];
		try {
			rank = await players.distinct("flex_rank");
			return rank;
		} catch (e) {
			console.error(`Unable to get flex rank, ${e}`);
			return rank;
		}
	}

	static async getRankTft() {
		let rank = [];
		try {
			rank = await players.distinct("tft_rank");
			return rank;
		} catch (e) {
			console.error(`Unable to get tft rank, ${e}`);
			return rank;
		}
	}

	static async getRole() {
		let role = [];
		try {
			role = await players.distinct("primary_role");
			return role;
		} catch (e) {
			console.error(`Unable to get role, ${e}`);
			return role;
		}
	}

	static async getServer() {
		let server = [];
		try {
			server = await players.distinct("server");
			return server;
		} catch (e) {
			console.error(`Unable to get server, ${e}`);
			return server;
		}
	}

	static async getLanguage() {
		let language = [];
		try {
			language = await players.distinct("language");
			return language;
		} catch (e) {
			console.error(`Unable to get language, ${e}`);
			return language;
		}
	}

	static async getPlayerById(id) {
		try {
			return await players
				.aggregate([
					{
						$match: {
							_id: new ObjectId(id),
						},
					},
					{
						$lookup: {
							from: "reviews",
							localField: "_id",
							foreignField: "player_id",
							as: "reviews",
						},
					},
				])
				.next();
		} catch (e) {
			console.error(`Something went wrong in getPlayerById: ${e}`);
			throw e;
		}
	}
}
