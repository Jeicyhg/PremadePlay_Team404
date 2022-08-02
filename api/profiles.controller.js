import ProfilesDAO from "../dao/profilesDAO.js";

export default class PrtofilesController {
    // create the new profile with user name, user id, data, create date.
    static async apiPostReview(req, res, next) {
        try {
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
                rank: req.body.rank,
                role: req.body.role,
                server: req.body.server,
                language: req.body.language
            }

            const date = new Date();

            const reviewResponse = await ProfilesDAO.addProfile(
                userInfo,
                date
            );
            console.log(userInfo);
            
            var {error} = reviewResponse;

            if(error) {
                res.status(500).json({error: "Unable to post review"});
            } else {
                res.json({status: " success"});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }
    // Update the profile with userID, their data and update date.
    static async apiUpdateReview(req, res, next) {
        try {
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id,
                rank: req.body.rank,
                role: req.body.role,
                server: req.body.server,
                language: req.body.language
            }
            const date = new Date();

            const reviewResponse = await ProfilesDAO.updateProfile(
                userInfo,
                date
            );

            var {error} = reviewResponse;
            if(error) {
                res.status(500).json({error: "Unable to update review"});
            } else {
                res.json({status: " success"});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }

    // use user_id to delete profile => everyone have unique id(email).
    static async apiDeleteReview(req, res, next) {
        try {
            const userID = req.body.user_id;
            const reviewResponse = await ProfilesDAO.deleteReview(
                userID
            );

            var {error} = reviewResponse;
            if(error) {
                res.status(500).json({error: "Unable to delete review"});
            } else {
                res.json({status: " success"});
            }
        } catch(e) {
            res.status(500).json({error: e.message});
        }
    }
}