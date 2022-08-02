import app from'./server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import ProfileDAO from './dao/profilesDAO.js';
import PlayersDAO from './dao/playersDAO.js';
import MessageDAO from './dao/messageDAO.js';
async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(
        process.env.PLAYEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000;

    try {
        //Connect to MongoDB server
        await client.connect();
        await PlayersDAO.injectDB(client);
        await ProfileDAO.injectDB(client);
        await MessageDAO.injectDB(client);
        app.listen(port, () => {
            console.log('Server is running on port: '+port);
        }) 
    } catch (e) {
            console.error(e);
            process.exit(1);
    }
}

main().catch(console.error);