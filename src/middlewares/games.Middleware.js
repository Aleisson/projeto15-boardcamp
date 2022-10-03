import { STATUS_CODE } from "../Enums/statusCode.Enum.js";
import connection from "../database/database.js";
import { postGamesSchema } from "../schemas/games.Schema.js";


async function postGamesMiddleWare(req, res, next) {

    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    const isValid = postGamesSchema.validate({ name, stockTotal, pricePerDay });

    if (isValid.error) {
        return res.sendStatus(STATUS_CODE.BAD_REQUEST);
    }


    try {

        const checkCategoryId = await connection
            .query('SELECT * FROM categories WHERE id = $1;', [categoryId]);

        if (!checkCategoryId.rowCount) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        }


        const checkNameGame = await connection
            .query('SELECT * FROM games WHERE name = $1;', [name]);

        if (checkNameGame.rowCount) {
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }


        res.locals.games = { name, image, stockTotal, categoryId, pricePerDay }
        next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}

export { postGamesMiddleWare }