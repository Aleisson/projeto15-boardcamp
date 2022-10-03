import express from 'express';
import { getRentals, postRentals, postRentalsIdReturn, deleteRentals } from '../controllers/rentals.Controllers.js'
import { postRentalsMiddleware, postRentalsIdReturnMiddleware, deleteRetalsIdMiddleware } from '../middlewares/rentals.Middleware.js';

const router = express.Router();

router.get('/rentals', getRentals);

router.post('/rentals', postRentalsMiddleware, postRentals);

router.post('/rentals/:id/return', postRentalsIdReturnMiddleware, postRentalsIdReturn);


router.delete('/rentals/:id', deleteRetalsIdMiddleware, deleteRentals);

export default router;