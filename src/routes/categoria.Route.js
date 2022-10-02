import expres from "express";
import { getCategories,  postCategories} from '../controllers/categorias.Controllers.js'
import { postCategoriaMiddleWare } from "../middlewares/categorias.Middleware.js";

const router = expres.Router();

router.get('/categories', getCategories);

router.post('/categories', postCategoriaMiddleWare, postCategories);

export default router;