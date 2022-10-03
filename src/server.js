import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import categoriaRoutes from './routes/categoria.Route.js'
import gamesRoutes from './routes/games.Route.js'
import customersROutes from './routes/customers.Route.js'

dotenv.config();
const server = express();


server.use(json());
server.use(cors());

//Routes
server.use(categoriaRoutes);
server.use(gamesRoutes);
server.use(customersROutes);

server.listen(process.env.PORT, () => {
    console.log("Server running on port" + process.env.PORT);
});