import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import categoriaRoutes from './routes/categoria.Route.js'


dotenv.config();
const server = express();


server.use(json());
server.use(cors());

//Routes
server.use(categoriaRoutes);


server.listen(process.env.PORT, () => {
    console.log("Server running on port" + process.env.PORT);
});