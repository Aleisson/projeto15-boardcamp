import expres from "express";
import { getCategories} from '../controllers/categorias.Controllers.js'

const router = expres.Router();

router.get('/categories', getCategories);

export default router;