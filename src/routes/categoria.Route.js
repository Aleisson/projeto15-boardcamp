import expres from "express";
import { getCategorias } from '../controllers/categorias.Controllers.js'

const router = expres.Router();

router.get('/categorias', getCategorias);

export default router;