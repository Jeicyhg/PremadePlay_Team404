import MessageDAO from "../dao/messageDAO.js";
export default class MessageController {

    static async apiGetMessages(req, res, next) {
        // filter for retrieving message data
        let filters = {}
        if(req.query.player1) {
            filters.player1 = req.query.player1;
        } 
        if(req.query.player2) {
            filters.player2 = req.query.player2;
        } 

        const { chatHistory} = await
            MessageDAO.getChatHistory({filters});

        let response = {
            chatHistory : chatHistory,
            filters: filters,
        };
        res.json(response);
    }

    // create the new message with user name, user id, text, create date.
    static async apiPostMessage(req, res, next) {
        try {
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
                text: req.body.text,
            }

            const date = new Date();

            const messagesResponse = await MessageDAO.addMessage(
                userInfo,
                date
            );
            
            var {error} = messagesResponse;

            if(error) {
                res.status(500).json({error: "Unable to post message"});
            } else {
                res.json({status: " success"});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

}