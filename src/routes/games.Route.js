import express from 'express';
import { getGames, postGames } from '../controllers/games.Controllers.js';
import { postGamesMiddleWare } from '../middlewares/games.Middleware.js';


const router = express.Router();

router.get('/games', getGames);

router.post('/games', postGamesMiddleWare, postGames)



export default router;