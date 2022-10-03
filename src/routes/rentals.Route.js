import express from 'express';
import { getRentals } from '../controllers/rentals.Controllers.js'

const router = express.Router();

router.get('/rentals', getRentals);

export default router;