import express from 'express';
import PlayersController from './players.controller.js';
import ProfilesController from './profiles.controller.js';
import MessageController from './message.controller.js';

const router = express.Router(); // get access to express router

router.route("/").get(PlayersController.apiGetPlayers);
router.route("/id/:id").get(PlayersController.apiGetPlayerById);
router.route("/rank").get(PlayersController.apiGetRank);
router.route("/role").get(PlayersController.apiGetRole);
router.route("/server").get(PlayersController.apiGetServer);
router.route("/language").get(PlayersController.apiGetLanguage);

router.route("/profiles").post(ProfilesController.apiPostReview)
                         .put(ProfilesController.apiUpdateReview)
                         .delete(ProfilesController.apiDeleteReview);

router.route("/messages").get(MessageController.apiGetMessages)
                         .post(MessageController.apiPostMessage);


export default router;