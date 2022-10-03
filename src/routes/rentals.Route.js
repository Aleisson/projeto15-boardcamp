import express from 'express';
import { getRentals, postRentals } from '../controllers/rentals.Controllers.js'
import { postRentalsMiddleware } from '../middlewares/rentals.Middleware.js';

const router = express.Router();

router.get('/rentals', getRentals);

router.post('/rentals', postRentalsMiddleware, postRentals)

export default router;