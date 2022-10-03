import express from 'express';
import { getRentals, postRentals, postRentalsIdReturn } from '../controllers/rentals.Controllers.js'
import { postRentalsMiddleware, postRentalsIdReturnMiddleware } from '../middlewares/rentals.Middleware.js';

const router = express.Router();

router.get('/rentals', getRentals);

router.post('/rentals', postRentalsMiddleware, postRentals);

router.post('/rentals/:id/return', postRentalsIdReturnMiddleware, postRentalsIdReturn);

export default router;