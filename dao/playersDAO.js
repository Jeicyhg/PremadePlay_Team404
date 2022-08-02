import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId

let players;

export default class PlayersDAO {
    static async injectDB(conn) {
        if(players) {
            return;
        }
        try {
            players = await conn.db(process.env.PLAYERREVIEWS_NS)
                            .collection('profile');
        
        }
        catch(e) {
            console.error(`Unable to connect in PlayersDAO: ${e}`);
        }
    }

    static async getPlayers({
        filters = null,
        page = 0,
        playersPerPage = 20,
    } = {}) { // empty object is default parameter in case arg is undefined
        let queryText = {};
        let queryRank = {};
        let queryRole = {};
        let queryServer = {};
        let queryLanguage = {};
        if(filters) {
            if("title" in filters) {
                queryText = { $text: { $search:filters['title']}};                
            }
            if("rank" in filters) {
                queryRank = {"rank": {$eq: filters['rank']}}
            }
            if("role" in filters) {
                queryRole = {"role": {$eq: filters['role']}}
            }
            if("server" in filters) {
                queryServer = {"server": {$eq: filters['server']}}
            }
            if("language" in filters) {
                queryLanguage = {"language": {$eq: filters['language']}}
            }
        }
        //assgin all object together
        let query = Object.assign(queryText, queryRank, queryRole, queryServer, queryLanguage);
        // empty object will return all of profiles
        let cursor;
        try {
            cursor = await players.find(query)
                                 .limit(playersPerPage)
                                 .skip(playersPerPage * page);
            const playersList = await cursor.toArray();
            const totalNumPlayers = await players.countDocuments(query);
            return {playersList, totalNumPlayers};
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return { playersList: [], totalNumPlayers: 0};
        }
    }

    static async getRank() {
        let rank = [];
        try {
            rank = await players.distinct("rank");
            return rank;
        } catch(e) {
            console.error(`Unable to get rank, ${e}`);
            return rank;
        }
    }

    static async getRole() {
        let rank = [];
        try {
            rank = await players.distinct("role");
            return rank;
        } catch(e) {
            console.error(`Unable to get role, ${e}`);
            return rank;
        }
    }

    static async getServer() {
        let rank = [];
        try {
            rank = await players.distinct("server");
            return rank;
        } catch(e) {
            console.error(`Unable to get server, ${e}`);
            return rank;
        }
    }

    static async getLanguage() {
        let rank = [];
        try {
            rank = await players.distinct("language");
            return rank;
        } catch(e) {
            console.error(`Unable to get language, ${e}`);
            return rank;
        }
    }

    static async getPlayerById(id) {
        try {
            return await players.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'player_id',
                        as: 'reviews',
                    }
                }
            ]).next();
        } catch(e) {
            console.error(`Something went wrong in getPlayerById: ${e}`);
            throw e;
        }
    }
}