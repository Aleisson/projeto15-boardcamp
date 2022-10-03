import express from 'express';
import { getGames } from '../controllers/games.Controllers.js';

const router = express.Router();

router.get('/games', getGames);

export default router;