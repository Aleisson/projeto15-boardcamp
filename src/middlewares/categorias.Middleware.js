import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import { postCategoriasSchema } from "../schemas/categorias.Schema.js";


async function postCategoriaMiddleWare(req, res, next) {

    const { name } = req.body;

    const isValid = postCategoriaMiddleWare.validate({ name });

    if(isValid.error){
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    


}