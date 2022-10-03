import express from 'express';
import { getCustomers, getCustomersId, postCustomers, putCustomerId } from '../controllers/customers.Controller.js'
import { customerMiddleware } from '../middlewares/customers.Middleware.js';

const router = express.Router();

router.get('/customers', getCustomers);

router.get('/customers/:id', getCustomersId);

router.post('/customers', customerMiddleware, postCustomers);

router.put('/customers/:id', customerMiddleware, putCustomerId);

export default router;
