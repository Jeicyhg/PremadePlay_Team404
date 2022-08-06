import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId

let messages;

export default class MessageDAO {
    static async injectDB(conn) {
        if(messages) {
            return;
        }
        try {
            messages = await conn.db(process.env.PLAYERREVIEWS_NS)
                            .collection('messages');
        
        }
        catch(e) {
            console.error(`Unable to connect in MessagesDAO: ${e}`);
        }
    }
    // get message history.
    static async getChatHistory({
        filters = null,
    } = {}) { // empty object is default parameter in case arg is undefined
        let queryPlayer1 = {};
        let queryPlayer2 = {};
        if(filters) {
            if("player1" in filters) {
                queryPlayer1 = {"senderID": {$eq: filters['player1']}}              
            }
            if("player2" in filters) {
                queryPlayer2 = {"senderID": {$eq: filters['player2']}}
            }
        }
        // empty object will return all of profiles
        let cursorPlayer1;
        let cursorPlayer2;
        try {
            cursorPlayer1 = await messages.find(queryPlayer1);
            cursorPlayer2 = await messages.find(queryPlayer2);
            console.log(cursorPlayer1);
            //put two chat history together and sort it.
            let cursor = Object.assign(cursorPlayer1, cursorPlayer2)
            cursor = cursor.sort({"date":1})
            const chatHistory = await cursor.toArray();
            return {chatHistory};
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`);
            return { chatHistory: []};
        }
    }

    static async addMessage(userInfo, date) {
        try {
            const messageDoc = {
                name: userInfo.name,
                user_id: userInfo._id,
                text: userInfo.text,
                date: date,
            }
            return await messages.insertOne(messageDoc);
        }
        catch(e) {
            console.error(`Unable to post message: ${e}`)
            return { error: e};
        }
    }
    
}