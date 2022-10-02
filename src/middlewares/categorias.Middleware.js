import connection from "../database/database.js";
import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import { postCategoriesSchema } from "../schemas/categorias.Schema.js";


async function postCategoriaMiddleWare(req, res, next) {

    const { name } = req.body;

    const isValid = postCategoriesSchema.validate({ name });
    
    if (isValid.error) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }

    try {

        const checkName = await connection.query('SELECT * FROM categories WHERE name = $1', [name]);
       

        
        if (checkName.rowCount) {
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    res.locals.name = { name };
    next();


}

export { postCategoriaMiddleWare };