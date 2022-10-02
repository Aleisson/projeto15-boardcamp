import { STATUS_CODE } from '../Enums/statusCode.Enum.js'
import connection from '../database/database.js'

async function getCategories(req, res) {

    try {
        
        const categories = (await connection.query('SELECT * FROM categories;')).rows;
        res.status(STATUS_CODE.OK).send(categories);

    } catch (error) {
        console.error(error);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

}



export { getCategories }