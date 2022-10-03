import express from 'express';
import { getCustomers, getCustomersId } from '../controllers/customers.Controller.js'


const router = express.Router();

router.get('/customers', getCustomers);

router.get('/customers/:id', getCustomersId);


export default router;
